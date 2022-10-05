from socket import AF_INET
from typing import Any, Literal, TypedDict

from aiohttp import ClientSession, ClientTimeout, TCPConnector
from fastapi.logger import logger

SIZE_POOL_AIOHTTP = 100


class SessionResponse(TypedDict):
    status: Literal["ok", "error"]
    message: str


# https://github.com/raphaelauv/fastAPI-aiohttp-example
class SingletonAiohttp:
    aiohttp_client: ClientSession | None = None

    @classmethod
    def get_aiohttp_client(cls) -> ClientSession:
        if cls.aiohttp_client is None:
            timeout = ClientTimeout(total=1.0)
            connector = TCPConnector(
                family=AF_INET, limit_per_host=SIZE_POOL_AIOHTTP
            )
            cls.aiohttp_client = ClientSession(
                timeout=timeout, connector=connector
            )

        return cls.aiohttp_client

    @classmethod
    async def close_aiohttp_client(cls) -> None:
        if cls.aiohttp_client:
            await cls.aiohttp_client.close()
            cls.aiohttp_client = None

    @classmethod
    async def get(cls, *args: Any, **kwargs: Any) -> SessionResponse:
        try:
            async with cls.get_aiohttp_client().get(
                *args, **kwargs
            ) as response:
                if response.status != 200:
                    return {
                        "status": "error",
                        "message": f"Bad status code {response.status}",
                    }
                return {"status": "ok", "message": await response.text()}
        except TimeoutError:
            logger.error(f"timeouterror: {args}")
            return {"status": "error", "message": "Timeout"}


async def on_start_up() -> None:
    logger.info("starting up aiohttp client")
    SingletonAiohttp.get_aiohttp_client()


async def on_shutdown() -> None:
    logger.info("shutting down aiohttp client")
    await SingletonAiohttp.close_aiohttp_client()
