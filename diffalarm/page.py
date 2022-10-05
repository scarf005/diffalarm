import re
import time
from dataclasses import dataclass
from pathlib import Path
from re import Pattern

import requests
import yaml
from bs4 import BeautifulSoup as Soup

from .beep import beep


@dataclass
class Page:
    url: str
    selector: str
    regex: Pattern[str]
    criteria: int
    interval: int

    @classmethod
    def from_path(cls, path: str | Path) -> "Page":
        data = yaml.safe_load(Path(path).read_text())
        data["regex"] = re.compile(data["regex"])
        return cls(**data)

    def run(self):
        while True:
            html = requests.get(self.url)
            soup = Soup(html.text, "html.parser")
            self.check(soup)
            time.sleep(self.interval)

    def check(self, soup: Soup):
        match soup.select_one(self.selector):
            case None:
                print(
                    f"CSS Selector 규칙 {self.selector}가 잘못되었거나,"
                    "해당 페이지에는 해당 요소가 없습니다."
                )
                exit(1)
            case _ as tag:
                data = "".join(re.findall(self.regex, tag.text.strip()))
                number = int(data)
                if number >= self.criteria:
                    print(f"{number}이 {self.criteria} 이상입니다.")
                    beep(sound="ping")
                else:
                    print(f"{number} < {self.criteria}")
