import logging

from bs4 import BeautifulSoup as Soup
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, HttpUrl

from .singletonAiohttp import SessionResponse
from .singletonAiohttp import SingletonAiohttp as session
from .singletonAiohttp import on_shutdown, on_start_up


class Query(BaseModel):
    url: HttpUrl


class QueryElement(Query):
    selector: str


app = FastAPI(docs_url="/", on_startup=[on_start_up], on_shutdown=[on_shutdown])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://localhost:5173"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


async def get_element(text: str, selector: str) -> str | None:
    soup = Soup(text, "html.parser")
    match soup.select_one(selector):
        case None:
            return None
        case _ as tag:
            return "".join(tag.text.strip())


async def resolve_query(text: str, selector: str) -> SessionResponse:  # type: ignore
    match await get_element(text, selector):
        case str() as text:
            return {"status": "ok", "message": text}
        case None:
            return {"status": "error", "message": "No element found"}


@app.get("/")
async def root():
    return "Hello World"


@app.post("/api/query")
async def query(query: Query):
    return await session.get(query.url)


@app.post("/api/query/element")
async def query_element(query: QueryElement):
    response = await session.get(query.url)
    match response["status"]:
        case "error":
            return response
        case "ok":
            return await resolve_query(response["message"], query.selector)


@app.exception_handler(RequestValidationError)  # type: ignore
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
):
    exc_str = f"{exc}"
    logging.error(f"{request}: {exc_str}")
    content = {"status_code": 10422, "message": exc_str, "data": None}
    return JSONResponse(
        content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY
    )
