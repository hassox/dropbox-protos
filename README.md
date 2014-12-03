## Dropbox Protos

Contains protocol buffer definitions of the Dropbox Apis. 

This is simply a translation of their excellent documentation and any errors belong to @hassox.

The dropbox protos have been marked up to work with [Fender](https://github.com/hassox/fender.git).

## Dependencies

* [Fender](https://github.com/hassox/fender)
* [Google](https://github.com/hassox/google-protos)
* [Public Protos](https://github.com/hassox/public-protos)

## Usage

You can include this repository as a submodule or simply add it to your protos.json if you're using [protob](https://github.com/square/protob.git).

An example protos.json file:

    [
      { "git": "http://github.com/hassox/google-protos.git" },
      { "git": "http://github.com/hassox/fender.git" },
      { "git": "http://github.com/hassox/public-protos.git" },
      { "git": "http://github.com/hassox/dropbox-protos.git" }
    ]

Then pilgrimize

    npm install -g pilgrimize

    pilgrimize

Open up [pilgrim](http://pilgrim.fender.io)

## Caveats

Beware any endpoints that deal with raw files like `GET /files` or `POST|PUT /files_put`.
Protocol buffers are a message format (like JSON) and is suited to short sharp messages.
Whilst it's possible to use protos to send files as bytes, there is no streaming.
You'll need to load the entire file into memory completely in order to work with the proto message.

Because of this reason, the endpoints for `GET /files` and `POST|PUT /files_put` are not implemented in protos.

The following endpoints are not implemented:

### Core API

File endpoints

- `GET /files`
- `POST|PUT /files_put`

These endpoints aren't implemented because the return type is a list with differently shaped entries.
i.e. [<path>, FileMetadata], these cannot be described with protocol buffers.

- GET `/delta`
- POST `/delta/latest_cursor`
- GET `/longpoll_delta`
