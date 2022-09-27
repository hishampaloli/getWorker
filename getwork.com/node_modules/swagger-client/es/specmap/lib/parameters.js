import _objectSpread from "@babel/runtime-corejs3/helpers/objectSpread2";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import lib from './index.js';
export default {
  key: 'parameters',
  plugin: function plugin(parameters, key, fullPath, specmap) {
    if (Array.isArray(parameters) && parameters.length) {
      var val = _Object$assign([], parameters);

      var opPath = _sliceInstanceProperty(fullPath).call(fullPath, 0, -1);

      var op = _objectSpread({}, lib.getIn(specmap.spec, opPath));

      parameters.forEach(function (param, i) {
        try {
          val[i].default = specmap.parameterMacro(op, param);
        } catch (e) {
          var err = new Error(e);
          err.fullPath = fullPath;
          return err;
        }

        return undefined;
      });
      return lib.replace(fullPath, val);
    }

    return lib.replace(fullPath, parameters);
  }
};