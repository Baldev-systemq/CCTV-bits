"use strict";
(self["webpackChunkRoots"] = self["webpackChunkRoots"] || []).push([["assets_js_theme_home_js"],{

/***/ "./assets/js/theme/home.js"
/*!*********************************!*\
  !*** ./assets/js/theme/home.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
;


var Home = /*#__PURE__*/function (_PageManager) {
  function Home() {
    return _PageManager.apply(this, arguments) || this;
  }
  _inheritsLoose(Home, _PageManager);
  var _proto = Home.prototype;
  _proto.onReady = function onReady() {
    var _this = this;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-kits-section]').each(function (i, el) {
      return _this.loadProducts(jquery__WEBPACK_IMPORTED_MODULE_0___default()(el));
    });
  };
  _proto.loadProducts = function loadProducts($section) {
    var $target = $section.find('[data-kits-products]');
    var limit = parseInt($section.data('kitsLimit'), 10) || 4;
    var rawUrl = $section.data('kitsUrl');
    if (!rawUrl) {
      $section.hide();
      return;
    }
    var path = new URL(rawUrl, window.location.origin).pathname;
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage(path, {
      template: 'custom/kits-products',
      config: {
        category: {
          products: {
            limit: limit
          }
        }
      }
    }, function (err, response) {
      if (err || !response) {
        console.error('Products load failed', path, err);
        $section.hide();
        return;
      }
      $target.html(response);
      $target.find('li.product').slice(limit).remove();
    });
  };
  return Home;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9ob21lX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUF1QjtBQUN3QjtBQUNOO0FBQUEsSUFFcEJHLElBQUksMEJBQUFDLFlBQUE7RUFBQSxTQUFBRCxLQUFBO0lBQUEsT0FBQUMsWUFBQSxDQUFBQyxLQUFBLE9BQUFDLFNBQUE7RUFBQTtFQUFBQyxjQUFBLENBQUFKLElBQUEsRUFBQUMsWUFBQTtFQUFBLElBQUFJLE1BQUEsR0FBQUwsSUFBQSxDQUFBTSxTQUFBO0VBQUFELE1BQUEsQ0FDckJFLE9BQU8sR0FBUCxTQUFBQSxPQUFPQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxLQUFBO0lBQ05YLDZDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQ1ksSUFBSSxDQUFDLFVBQUNDLENBQUMsRUFBRUMsRUFBRTtNQUFBLE9BQUtILEtBQUksQ0FBQ0ksWUFBWSxDQUFDZiw2Q0FBQyxDQUFDYyxFQUFFLENBQUMsQ0FBQztJQUFBLEVBQUM7RUFDdEUsQ0FBQztFQUFBTixNQUFBLENBRURPLFlBQVksR0FBWixTQUFBQSxZQUFZQSxDQUFDQyxRQUFRLEVBQUU7SUFDbkIsSUFBTUMsT0FBTyxHQUFHRCxRQUFRLENBQUNFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztJQUNyRCxJQUFNQyxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0osUUFBUSxDQUFDSyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztJQUMzRCxJQUFNQyxNQUFNLEdBQUdOLFFBQVEsQ0FBQ0ssSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QyxJQUFJLENBQUNDLE1BQU0sRUFBRTtNQUFFTixRQUFRLENBQUNPLElBQUksQ0FBQyxDQUFDO01BQUU7SUFBUTtJQUV4QyxJQUFNQyxJQUFJLEdBQUcsSUFBSUMsR0FBRyxDQUFDSCxNQUFNLEVBQUVJLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUMsQ0FBQ0MsUUFBUTtJQUU3RDVCLHNFQUFTLENBQUM4QixPQUFPLENBQUNQLElBQUksRUFBRTtNQUNwQlEsUUFBUSxFQUFFLHNCQUFzQjtNQUNoQ0MsTUFBTSxFQUFFO1FBQUVDLFFBQVEsRUFBRTtVQUFFQyxRQUFRLEVBQUU7WUFBRWhCLEtBQUssRUFBTEE7VUFBTTtRQUFFO01BQUU7SUFDaEQsQ0FBQyxFQUFFLFVBQUNpQixHQUFHLEVBQUVDLFFBQVEsRUFBSztNQUNsQixJQUFJRCxHQUFHLElBQUksQ0FBQ0MsUUFBUSxFQUFFO1FBQ2xCQyxPQUFPLENBQUNDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRWYsSUFBSSxFQUFFWSxHQUFHLENBQUM7UUFDaERwQixRQUFRLENBQUNPLElBQUksQ0FBQyxDQUFDO1FBQ2Y7TUFDSjtNQUNBTixPQUFPLENBQUN1QixJQUFJLENBQUNILFFBQVEsQ0FBQztNQUN0QnBCLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDdUIsS0FBSyxDQUFDdEIsS0FBSyxDQUFDLENBQUN1QixNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEsT0FBQXZDLElBQUE7QUFBQSxFQXpCNkJELHFEQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vUm9vdHMvLi9hc3NldHMvanMvdGhlbWUvaG9tZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgJCgnW2RhdGEta2l0cy1zZWN0aW9uXScpLmVhY2goKGksIGVsKSA9PiB0aGlzLmxvYWRQcm9kdWN0cygkKGVsKSkpO1xuICAgIH1cblxuICAgIGxvYWRQcm9kdWN0cygkc2VjdGlvbikge1xuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJHNlY3Rpb24uZmluZCgnW2RhdGEta2l0cy1wcm9kdWN0c10nKTtcbiAgICAgICAgY29uc3QgbGltaXQgPSBwYXJzZUludCgkc2VjdGlvbi5kYXRhKCdraXRzTGltaXQnKSwgMTApIHx8IDQ7XG4gICAgICAgIGNvbnN0IHJhd1VybCA9ICRzZWN0aW9uLmRhdGEoJ2tpdHNVcmwnKTtcbiAgICAgICAgaWYgKCFyYXdVcmwpIHsgJHNlY3Rpb24uaGlkZSgpOyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBwYXRoID0gbmV3IFVSTChyYXdVcmwsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pLnBhdGhuYW1lO1xuXG4gICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKHBhdGgsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnY3VzdG9tL2tpdHMtcHJvZHVjdHMnLFxuICAgICAgICAgICAgY29uZmlnOiB7IGNhdGVnb3J5OiB7IHByb2R1Y3RzOiB7IGxpbWl0IH0gfSB9LFxuICAgICAgICB9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVyciB8fCAhcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdQcm9kdWN0cyBsb2FkIGZhaWxlZCcsIHBhdGgsIGVycik7XG4gICAgICAgICAgICAgICAgJHNlY3Rpb24uaGlkZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICR0YXJnZXQuaHRtbChyZXNwb25zZSk7XG4gICAgICAgICAgICAkdGFyZ2V0LmZpbmQoJ2xpLnByb2R1Y3QnKS5zbGljZShsaW1pdCkucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iXSwibmFtZXMiOlsiJCIsInV0aWxzIiwiUGFnZU1hbmFnZXIiLCJIb21lIiwiX1BhZ2VNYW5hZ2VyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCJfdGhpcyIsImVhY2giLCJpIiwiZWwiLCJsb2FkUHJvZHVjdHMiLCIkc2VjdGlvbiIsIiR0YXJnZXQiLCJmaW5kIiwibGltaXQiLCJwYXJzZUludCIsImRhdGEiLCJyYXdVcmwiLCJoaWRlIiwicGF0aCIsIlVSTCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwicGF0aG5hbWUiLCJhcGkiLCJnZXRQYWdlIiwidGVtcGxhdGUiLCJjb25maWciLCJjYXRlZ29yeSIsInByb2R1Y3RzIiwiZXJyIiwicmVzcG9uc2UiLCJjb25zb2xlIiwiZXJyb3IiLCJodG1sIiwic2xpY2UiLCJyZW1vdmUiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==