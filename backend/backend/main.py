import re

import aiohttp
from bs4 import BeautifulSoup as Soup
from bs4 import Tag
from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl

from .singletonAiohttp import SessionResponse
from .singletonAiohttp import SingletonAiohttp as session
from .singletonAiohttp import on_shutdown, on_start_up


class QueryElement(BaseModel):
    css_selector: str

class Query(QueryElement):
    url: HttpUrl


app = FastAPI(
    docs_url="/", on_startup=[on_start_up], on_shutdown=[on_shutdown]
)


async def get_element(text: str, css_selector: str) -> str | None:
    soup = Soup(text, "html.parser")
    match soup.select_one(css_selector):
        case None:
            return None
        case _ as tag:
            return "".join(tag.text.strip())


async def resolve_query(text: str, css_selector: str) -> SessionResponse:  # type: ignore
    match await get_element(text, css_selector):
        case str() as text:
            return {"status": "ok", "message": text}
        case None:
            return {"status": "error", "message": "No element found"}

@app.get("/query")
async def query(query: Query):
    return await session.get(query.url)

@app.get("/query/element")
async def query_element(query: Query):
    response = await session.get(query.url)
    match response["status"]:
        case "error":
            return response
        case "ok":
            return await resolve_query(response["message"], query.css_selector)
