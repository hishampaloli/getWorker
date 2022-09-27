import _toConsumableArray from "@babel/runtime-corejs3/helpers/toConsumableArray";
import _objectSpread from "@babel/runtime-corejs3/helpers/objectSpread2";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import { isFreelyNamed, generateAbsoluteRefPatches } from '../helpers.js';
export default {
  key: 'allOf',
  plugin: function plugin(val, key, fullPath, specmap, patch) {
    // Ignore replace patches created by $ref because the changes will
    // occur in the original "add" patch and we don't want this plugin
    // to redundantly processes those "relace" patches.
    if (patch.meta && patch.meta.$$ref) {
      return undefined;
    }

    var parent = _sliceInstanceProperty(fullPath).call(fullPath, 0, -1);

    if (isFreelyNamed(parent)) {
      return undefined;
    }

    if (!Array.isArray(val)) {
      var err = new TypeError('allOf must be an array');
      err.fullPath = fullPath; // This is an array

      return err;
    }

    var alreadyAddError = false; // Find the original definition from the `patch.value` object
    // Remove the `allOf` property so it doesn't get added to the result of the `allOf` plugin

    var originalDefinitionObj = patch.value;
    parent.forEach(function (part) {
      if (!originalDefinitionObj) return; // bail out if we've lost sight of our target

      originalDefinitionObj = originalDefinitionObj[part];
    });
    originalDefinitionObj = _objectSpread({}, originalDefinitionObj); // when we've lost sight, interrupt prematurely

    if (_Object$keys(originalDefinitionObj).length === 0) {
      return undefined;
    }

    delete originalDefinitionObj.allOf;
    var patches = []; // remove existing content

    patches.push(specmap.replace(parent, {}));
    val.forEach(function (toMerge, i) {
      if (!specmap.isObject(toMerge)) {
        if (alreadyAddError) {
          return null;
        }

        alreadyAddError = true;

        var _err = new TypeError('Elements in allOf must be objects');

        _err.fullPath = fullPath; // This is an array

        return patches.push(_err);
      } // Deeply merge the member's contents onto the parent location


      patches.push(specmap.mergeDeep(parent, toMerge)); // Generate patches that migrate $ref values based on ContextTree information
      // remove ["allOf"], which will not be present when these patches are applied

      var collapsedFullPath = _sliceInstanceProperty(fullPath).call(fullPath, 0, -1);

      var absoluteRefPatches = generateAbsoluteRefPatches(toMerge, collapsedFullPath, {
        getBaseUrlForNodePath: function getBaseUrlForNodePath(nodePath) {
          var _context;

          return specmap.getContext(_concatInstanceProperty(_context = []).call(_context, _toConsumableArray(fullPath), [i], _toConsumableArray(nodePath))).baseDoc;
        },
        specmap: specmap
      });
      patches.push.apply(patches, _toConsumableArray(absoluteRefPatches));
      return undefined;
    }); // If there was an example in the original definition,
    // keep it instead of merging with examples from other schema

    if (originalDefinitionObj.example) {
      var _context2;

      // Delete other schema examples
      patches.push(specmap.remove(_concatInstanceProperty(_context2 = []).call(_context2, parent, 'example')));
    } // Merge back the values from the original definition


    patches.push(specmap.mergeDeep(parent, originalDefinitionObj)); // If there was not an original $$ref value, make sure to remove
    // any $$ref value that may exist from the result of `allOf` merges

    if (!originalDefinitionObj.$$ref) {
      var _context3;

      patches.push(specmap.remove(_concatInstanceProperty(_context3 = []).call(_context3, parent, '$$ref')));
    }

    return patches;
  }
};