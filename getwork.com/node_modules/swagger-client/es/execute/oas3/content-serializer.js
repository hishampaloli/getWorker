import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";

/*
  Serializer that serializes according to a media type instead of OpenAPI's
  `style` + `explode` constructs.
*/
export default function serialize(value, mediaType) {
  if (_includesInstanceProperty(mediaType).call(mediaType, 'application/json')) {
    if (typeof value === 'string') {
      // Assume the user has a JSON string
      return value;
    }

    return _JSON$stringify(value);
  }

  return value.toString();
}