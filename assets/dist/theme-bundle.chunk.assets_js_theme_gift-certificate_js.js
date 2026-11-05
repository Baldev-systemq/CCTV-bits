"use strict";
(self["webpackChunkRoots"] = self["webpackChunkRoots"] || []).push([["assets_js_theme_gift-certificate_js"],{

/***/ "./assets/js/theme/common/gift-certificate-validator.js"
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
__webpack_require__.dn(__WEBPACK_DEFAULT_EXPORT__);
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ },

/***/ "./assets/js/theme/common/utils/translations-utils.js"
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTranslationDictionary: () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ },

/***/ "./assets/js/theme/gift-certificate.js"
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GiftCertificate)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
;







var GiftCertificate = /*#__PURE__*/function (_PageManager) {
  function GiftCertificate(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');
      var insertFormattedAmountsIntoErrorMessage = function insertFormattedAmountsIntoErrorMessage(message) {
        for (var _len = arguments.length, amountRange = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          amountRange[_key - 1] = arguments[_key];
        }
        var amountPlaceholders = ['[MIN]', '[MAX]'];
        var updatedErrorText = message;
        amountPlaceholders.forEach(function (placeholder, i) {
          updatedErrorText = updatedErrorText.includes(placeholder) ? updatedErrorText.replace(placeholder, amountRange[i]) : updatedErrorText;
        });
        return updatedErrorText;
      };
      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);
          if (!numberVal) {
            cb(false);
          }
          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: insertFormattedAmountsIntoErrorMessage(_this.validationDictionary.certificate_amount_range, minFormatted, maxFormatted)
      });
    }
    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);
    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);
      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();
        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }
    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    $('#gift-certificate-preview').click(function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return;
      }
      var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__.api.getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }
        modal.updateContent(content, {
          wrap: true
        });
      });
    });
    return _this;
  }
  _inheritsLoose(GiftCertificate, _PageManager);
  var _proto = GiftCertificate.prototype;
  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $balanceForm.find('input[type="submit"]'),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb((0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__["default"])(val));
      },
      errorMessage: this.validationDictionary.invalid_gift_certificate
    });
    return balanceValidator;
  };
  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9naWZ0LWNlcnRpZmljYXRlX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQWUsb0NBQVVBLElBQUksRUFBRTtFQUMzQixJQUFJLE9BQU9BLElBQUksS0FBSyxRQUFRLElBQUlBLElBQUksQ0FBQ0MsTUFBTSxLQUFLLENBQUMsRUFBRTtJQUMvQyxPQUFPLEtBQUs7RUFDaEI7O0VBRUE7RUFDQSxPQUFPLElBQUk7QUFDZixDOzs7Ozs7Ozs7Ozs7OztBQ1BBLElBQU1DLFlBQVksR0FBRyxjQUFjO0FBQ25DLElBQU1DLCtCQUErQixHQUFHLFNBQWxDQSwrQkFBK0JBLENBQUlDLFVBQVU7RUFBQSxPQUFLLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxJQUFJLENBQUNGLFVBQVUsQ0FBQ0YsWUFBWSxDQUFDLENBQUMsQ0FBQ0QsTUFBTTtBQUFBO0FBQ3RHLElBQU1NLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUEsRUFBOEI7RUFDdEQsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdDLFNBQUEsQ0FBbUJSLE1BQU0sRUFBRU8sQ0FBQyxFQUFFLEVBQUU7SUFDaEQsSUFBTUosVUFBVSxHQUFHTSxJQUFJLENBQUNDLEtBQUssQ0FBb0JILENBQUMsUUFBQUMsU0FBQSxDQUFBUixNQUFBLElBQURPLENBQUMsR0FBQUksU0FBQSxHQUFBSCxTQUFBLENBQURELENBQUMsQ0FBQyxDQUFDO0lBQ3BELElBQUlMLCtCQUErQixDQUFDQyxVQUFVLENBQUMsRUFBRTtNQUM3QyxPQUFPQSxVQUFVO0lBQ3JCO0VBQ0o7QUFDSixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQU1TLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBMkJBLENBQUlDLE9BQU8sRUFBSztFQUNwRCxJQUFRQyx3QkFBd0IsR0FBd0VELE9BQU8sQ0FBdkdDLHdCQUF3QjtJ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RyxDQUFDO01BQ3pCa0MsTUFBTSxFQUFFMEQsWUFBWSxDQUFDNUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDO01BQ2pESSxHQUFHLEVBQUVqQywrRUFBeUJBO0lBQ2xDLENBQUMsQ0FBQztJQUVGMEYsZ0JBQWdCLENBQUN6QyxHQUFHLENBQUM7TUFDakJDLFFBQVEsRUFBRXVDLFlBQVksQ0FBQzVELElBQUksQ0FBQyxtQ0FBbUMsQ0FBQztNQUNoRXNCLFFBQVEsV0FBUkEsUUFBUUEsQ0FBQ0MsRUFBRSxFQUFFeEMsR0FBRyxFQUFFO1FBQ2R3QyxFQUFFLENBQUN0RCw4RUFBb0IsQ0FBQ2MsR0FBRyxDQUFDLENBQUM7TUFDakMsQ0FBQztNQUNEMkMsWUFBWSxFQUFFLElBQUksQ0FBQ2hELG9CQUFvQixDQUFDb0Y7SUFDNUMsQ0FBQyxDQUFDO0lBRUYsT0FBT0QsZ0JBQWdCO0VBQzNCLENBQUM7RUFBQSxPQUFBdkYsZUFBQTtBQUFBLEVBM013Q1AscURBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Sb290cy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vUm9vdHMvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyIsIndlYnBhY2s6Ly9Sb290cy8uL2Fzc2V0cy9qcy90aGVtZS9naWZ0LWNlcnRpZmljYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjZXJ0KSB7XG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJyB8fCBjZXJ0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFueSBjdXN0b20gZ2lmdCBjZXJ0aWZpY2F0ZSB2YWxpZGF0aW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiIsImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XG5pbXBvcnQgY2hlY2tJc0dpZnRDZXJ0VmFsaWQgZnJvbSAnLi9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3InO1xuaW1wb3J0IGZvcm1Nb2RlbCBmcm9tICcuL2NvbW1vbi9tb2RlbHMvZm9ybXMnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCB7IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UgfSBmcm9tICcuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCB7IGFwaSB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB7IGRlZmF1bHRNb2RhbCB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2lmdENlcnRpZmljYXRlIGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgJGNlcnRCYWxhbmNlRm9ybSA9ICQoJyNnaWZ0LWNlcnRpZmljYXRlLWJhbGFuY2UnKTtcblxuICAgICAgICBjb25zdCBwdXJjaGFzZU1vZGVsID0ge1xuICAgICAgICAgICAgcmVjaXBpZW50TmFtZSh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWNpcGllbnRFbWFpbCguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1Nb2RlbC5lbWFpbCguLi5hcmdzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZW5kZXJOYW1lKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwubGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRlckVtYWlsKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybU1vZGVsLmVtYWlsKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGN1c3RvbUFtb3VudCh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUgPj0gbWluICYmIHZhbHVlIDw9IG1heDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRBbW91bnQodmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgJHB1cmNoYXNlRm9ybSA9ICQoJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGN1c3RvbUFtb3VudHMgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV9hbW91bnRcIl0nKTtcbiAgICAgICAgY29uc3QgcHVyY2hhc2VWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcbiAgICAgICAgICAgIGRlbGF5OiAzMDAsXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgkY3VzdG9tQW1vdW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0ICRlbGVtZW50ID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfYW1vdW50XCJdJyk7XG4gICAgICAgICAgICBjb25zdCBtaW4gPSAkZWxlbWVudC5kYXRhKCdtaW4nKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbkZvcm1hdHRlZCA9ICRlbGVtZW50LmRhdGEoJ21pbkZvcm1hdHRlZCcpO1xuICAgICAgICAgICAgY29uc3QgbWF4ID0gJGVsZW1lbnQuZGF0YSgnbWF4Jyk7XG4gICAgICAgICAgICBjb25zdCBtYXhGb3JtYXR0ZWQgPSAkZWxlbWVudC5kYXRhKCdtYXhGb3JtYXR0ZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IGluc2VydEZvcm1hdHRlZEFtb3VudHNJbnRvRXJyb3JNZXNzYWdlID0gKG1lc3NhZ2UsIC4uLmFtb3VudFJhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYW1vdW50UGxhY2Vob2xkZXJzID0gWydbTUlOXScsICdbTUFYXSddO1xuICAgICAgICAgICAgICAgIGxldCB1cGRhdGVkRXJyb3JUZXh0ID0gbWVzc2FnZTtcbiAgICAgICAgICAgICAgICBhbW91bnRQbGFjZWhvbGRlcnMuZm9yRWFjaCgocGxhY2Vob2xkZXIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEVycm9yVGV4dCA9IHVwZGF0ZWRFcnJvclRleHQuaW5jbHVkZXMocGxhY2Vob2xkZXIpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRFcnJvclRleHQucmVwbGFjZShwbGFjZWhvbGRlciwgYW1vdW50UmFuZ2VbaV0pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRFcnJvclRleHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZWRFcnJvclRleHQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfYW1vdW50XCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnVtYmVyVmFsID0gTnVtYmVyKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFudW1iZXJWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKG51bWJlclZhbCA+PSBtaW4gJiYgbnVtYmVyVmFsIDw9IG1heCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGluc2VydEZvcm1hdHRlZEFtb3VudHNJbnRvRXJyb3JNZXNzYWdlKHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkuY2VydGlmaWNhdGVfYW1vdW50X3JhbmdlLCBtaW5Gb3JtYXR0ZWQsIG1heEZvcm1hdHRlZCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJ0b19uYW1lXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5yZWNpcGllbnROYW1lKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnRvTmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJ0b19lbWFpbFwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwucmVjaXBpZW50RW1haWwodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQudG9FbWFpbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJmcm9tX25hbWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnNlbmRlck5hbWUodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZnJvbU5hbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiZnJvbV9lbWFpbFwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwuc2VuZGVyRW1haWwodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZnJvbUVtYWlsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdOmZpcnN0LW9mLXR5cGUnLFxuICAgICAgICAgICAgICAgIHRyaWdnZXJlZEJ5OiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfdGhlbWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfdGhlbWVcIl06Y2hlY2tlZCcpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHR5cGVvZiAodmFsKSA9PT0gJ3N0cmluZycpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuY2VydFRoZW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImFncmVlXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImFncmVlXCJdJykuZ2V0KDApLmNoZWNrZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IodmFsKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmFncmVlVG9UZXJtcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJhZ3JlZTJcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiYWdyZWUyXCJdJykuZ2V0KDApLmNoZWNrZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IodmFsKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmFncmVlVG9UZXJtcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGlmICgkY2VydEJhbGFuY2VGb3JtLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHRoaXMuY2hlY2tDZXJ0QmFsYW5jZVZhbGlkYXRvcigkY2VydEJhbGFuY2VGb3JtKTtcblxuICAgICAgICAgICAgJGNlcnRCYWxhbmNlRm9ybS5vbignc3VibWl0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJhbGFuY2VWYWwucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWJhbGFuY2VWYWwuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRwdXJjaGFzZUZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAoIXB1cmNoYXNlVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjZ2lmdC1jZXJ0aWZpY2F0ZS1wcmV2aWV3JykuY2xpY2soZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmICghcHVyY2hhc2VWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuICAgICAgICAgICAgY29uc3QgcHJldmlld1VybCA9IGAkeyQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgncHJldmlld1VybCcpfSYkeyRwdXJjaGFzZUZvcm0uc2VyaWFsaXplKCl9YDtcblxuICAgICAgICAgICAgbW9kYWwub3BlbigpO1xuXG4gICAgICAgICAgICBhcGkuZ2V0UGFnZShwcmV2aWV3VXJsLCB7fSwgKGVyciwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGFsLnVwZGF0ZUNvbnRlbnQodGhpcy5jb250ZXh0LnByZXZpZXdFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChjb250ZW50LCB7IHdyYXA6IHRydWUgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hlY2tDZXJ0QmFsYW5jZVZhbGlkYXRvcigkYmFsYW5jZUZvcm0pIHtcbiAgICAgICAgY29uc3QgYmFsYW5jZVZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICRiYWxhbmNlRm9ybS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJyksXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJhbGFuY2VWYWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAkYmFsYW5jZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImdpZnRjZXJ0aWZpY2F0ZWNvZGVcIl0nKSxcbiAgICAgICAgICAgIHZhbGlkYXRlKGNiLCB2YWwpIHtcbiAgICAgICAgICAgICAgICBjYihjaGVja0lzR2lmdENlcnRWYWxpZCh2YWwpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkuaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYmFsYW5jZVZhbGlkYXRvcjtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiY2VydCIsImxlbmd0aCIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwiYXJndW1lbnRzIiwiSlNPTiIsInBhcnNlIiwidW5kZWZpbmVkIiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiY29udGV4dCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwibWFwIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiLCJQYWdlTWFuYWdlciIsIm5vZCIsImNoZWNrSXNHaWZ0Q2VydFZhbGlkIiwiZm9ybU1vZGVsIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImFwaSIsImRlZmF1bHRNb2RhbCIsIkdpZnRDZXJ0aWZpY2F0ZSIsIl9QYWdlTWFuYWdlciIsIl90aGlzIiwiY2FsbCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiJGNlcnRCYWxhbmNlRm9ybSIsIiQiLCJwdXJjaGFzZU1vZGVsIiwicmVjaXBpZW50TmFtZSIsInZhbCIsInJlY2lwaWVudEVtYWlsIiwiZW1haWwiLCJhcHBseSIsInNlbmRlck5hbWUiLCJzZW5kZXJFbWFpbCIsImN1c3RvbUFtb3VudCIsInZhbHVlIiwibWluIiwibWF4Iiwic2V0QW1vdW50Iiwib3B0aW9ucyIsImZvdW5kIiwiZm9yRWFjaCIsIm9wdGlvbiIsIiRwdXJjaGFzZUZvcm0iLCIkY3VzdG9tQW1vdW50cyIsImZpbmQiLCJwdXJjaGFzZVZhbGlkYXRvciIsInN1Ym1pdCIsImRlbGF5IiwidGFwIiwiJGVsZW1lbnQiLCJkYXRhIiwibWluRm9ybWF0dGVkIiwibWF4Rm9ybWF0dGVkIiwiaW5zZXJ0Rm9ybWF0dGVkQW1vdW50c0ludG9FcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwiX2xlbiIsImFtb3VudFJhbmdlIiwiQXJyYXkiLCJfa2V5IiwiYW1vdW50UGxhY2Vob2xkZXJzIiwidXBkYXRlZEVycm9yVGV4dCIsInBsYWNlaG9sZGVyIiwiaW5jbHVkZXMiLCJyZXBsYWNlIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwibnVtYmVyVmFsIiwiTnVtYmVyIiwiZXJyb3JNZXNzYWdlIiwiY2VydGlmaWNhdGVfYW1vdW50X3JhbmdlIiwicmVzdWx0IiwidG9OYW1lIiwidG9FbWFpbCIsImZyb21OYW1lIiwiZnJvbUVtYWlsIiwidHJpZ2dlcmVkQnkiLCJjZXJ0VGhlbWUiLCJnZXQiLCJjaGVja2VkIiwiYWdyZWVUb1Rlcm1zIiwiYmFsYW5jZVZhbCIsImNoZWNrQ2VydEJhbGFuY2VWYWxpZGF0b3IiLCJvbiIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjbGljayIsIm1vZGFsIiwicHJldmlld1VybCIsImN1cnJlbnRUYXJnZXQiLCJzZXJpYWxpemUiLCJvcGVuIiwiZ2V0UGFnZSIsImVyciIsImNvbnRlbnQiLCJ1cGRhdGVDb250ZW50IiwicHJldmlld0Vycm9yIiwid3JhcCIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwiJGJhbGFuY2VGb3JtIiwiYmFsYW5jZVZhbGlkYXRvciIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsImRlZmF1bHQiXSwic291cmNlUm9vdCI6IiJ9