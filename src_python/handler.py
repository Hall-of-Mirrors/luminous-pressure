import logging
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.realpath(__file__)))  # Add local dir to path


_LOGGER = logging.getLogger(__name__)
_LOGGER.setLevel(logging.INFO)


def handler(event, context):
    _LOGGER.debug(f"Incoming request: {str(event)}")
    return "hello world"
