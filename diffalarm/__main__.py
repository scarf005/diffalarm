"""
DiffAlarm - 웹페이지 변화 감지기

Usage:
    diffalarm <path-to-config>
    diffalarm -h | --help

Options:
    -h --help    이 도움말을 보여줍니다.
"""

from pathlib import Path

from docopt import docopt

from .page import Page


def main():
    assert __doc__ is not None

    path = Path(docopt(__doc__).get("<path-to-config>"))  # type: ignore
    if not path.exists():
        print(f"{path.absolute()}가 존재하지 않는 경로입니다.")
        exit(1)

    page = Page.from_path(path)
    page.run()


