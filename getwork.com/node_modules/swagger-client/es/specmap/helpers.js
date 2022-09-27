import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/toConsumableArray";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import traverse from 'traverse';
import URL from 'url'; // This will match if the direct parent's key exactly matches an item.

var freelyNamedKeyParents = ['properties']; // This will match if the grandparent's key exactly matches an item.
// NOTE that this is for finding non-free paths!

var nonFreelyNamedKeyGrandparents = ['properties']; // This will match if the joined parent path exactly matches an item.
//
// This is mostly useful for filtering out root-level reusable item names,
// for example `["definitions", "$ref"]`

var freelyNamedPaths = [// Swagger 2.0
'definitions', 'parameters', 'responses', 'securityDefinitions', // OpenAPI 3.0
'components/schemas', 'components/responses', 'components/parameters', 'components/securitySchemes']; // This will match if any of these items are substrings of the joined
// parent path.
//
// Warning! These are powerful. Beware of edge cases.

var freelyNamedAncestors = ['schema/example', 'items/example'];
export function isFreelyNamed(parentPath) {
  var parentKey = parentPath[parentPath.length - 1];
  var grandparentKey = parentPath[parentPath.length - 2];
  var parentStr = parentPath.join('/');
  return (// eslint-disable-next-line max-len
    freelyNamedKeyParents.indexOf(parentKey) > -1 && nonFreelyNamedKeyGrandparents.indexOf(grandparentKey) === -1 || freelyNamedPaths.indexOf(parentStr) > -1 || freelyNamedAncestors.some(function (el) {
      return parentStr.indexOf(el) > -1;
    })
  );
}
export function generateAbsoluteRefPatches(obj, basePath) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      specmap = _ref.specmap,
      _ref$getBaseUrlForNod = _ref.getBaseUrlForNodePath,
      getBaseUrlForNodePath = _ref$getBaseUrlForNod === void 0 ? function (path) {
    var _context;

    return specmap.getContext(_concatInstanceProperty(_context = []).call(_context, _toConsumableArray(basePath), _toConsumableArray(path))).baseDoc;
  } : _ref$getBaseUrlForNod,
      _ref$targetKeys = _ref.targetKeys,
      targetKeys = _ref$targetKeys === void 0 ? ['$ref', '$$ref'] : _ref$targetKeys;

  var patches = [];
  traverse(obj).forEach(function callback() {
    if (_includesInstanceProperty(targetKeys).call(targetKeys, this.key) && typeof this.node === 'string') {
      var nodePath = this.path; // this node's path, relative to `obj`

      var fullPath = _concatInstanceProperty(basePath).call(basePath, this.path);

      var absolutifiedRefValue = absolutifyPointer(this.node, getBaseUrlForNodePath(nodePath));
      patches.push(specmap.replace(fullPath, absolutifiedRefValue));
    }
  });
  return patches;
}
export function absolutifyPointer(pointer, baseUrl) {
  var _context2;

  var _pointer$split = pointer.split('#'),
      _pointer$split2 = _slicedToArray(_pointer$split, 2),
      urlPart = _pointer$split2[0],
      fragmentPart = _pointer$split2[1];

  var newRefUrlPart = URL.resolve(urlPart || '', baseUrl || '');
  return fragmentPart ? _concatInstanceProperty(_context2 = "".concat(newRefUrlPart, "#")).call(_context2, fragmentPart) : newRefUrlPart;
}