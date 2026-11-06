import 'focus-within-polyfill';

import utils from '@bigcommerce/stencil-utils';
import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import wishlistPreview from './global/wishlist-preview';
import privacyCookieNotification from './global/cookieNotification';
import adminBar from './global/adminBar';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';
import rootsLoaded from './roots/global';

export default class Global extends PageManager {
    onReady() {
        const {
            channelId, cartId, productId, categoryId, secureBaseUrl, maintenanceModeSettings, adminBarLanguage,
        } = this.context;
        cartPreview(secureBaseUrl, cartId);
        wishlistPreview();
        quickSearch();
        currencySelector(cartId);
        mobileMenuToggle();
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        privacyCookieNotification();
        adminBar(secureBaseUrl, channelId, maintenanceModeSettings, JSON.parse(adminBarLanguage), productId, categoryId);
        loadingProgressBar();
        svgInjector();
        this.bindProductCardAddToCart();

        rootsLoaded();
    }

    bindProductCardAddToCart() {
        const syncCartCounter = () => {
            utils.api.cart.getCartQuantity({}, (qtyErr, qty) => {
                if (!qtyErr) {
                    $('body').trigger('cart-quantity-update', qty);
                }
            });
        };

        const getProductCartItem = productId => new Promise(resolve => {
            utils.api.cart.getCart({}, (err, response) => {
                if (err || !response) {
                    resolve(null);
                    return;
                }

                const lineItems = response.lineItems || (response.cart && response.cart.lineItems) || {};
                const cartItems = [
                    ...(lineItems.physicalItems || []),
                    ...(lineItems.digitalItems || []),
                    ...(lineItems.giftCertificates || []),
                ];

                const matchingItem = cartItems.find(item => {
                    const itemProductId = Number(item.productId || item.product_id || item.productID || 0);
                    return itemProductId === Number(productId);
                });

                resolve(matchingItem || null);
            });
        });

        const toggleQuantityControls = ($card, productId, quantity) => {
            const $cta = $card.find('.card-cta');
            const $link = $cta.find('.card-cta-button').first();
            const $existing = $card.find(`.card-quantity-stepper[data-product-id="${productId}"]`);

            if (quantity <= 0) {
                if ($existing.length) {
                    $existing.remove();
                }

                if ($link.length) {
                    $link.show();
                }
                return;
            }

            if ($existing.length) {
                $existing.find('.card-qty-value').text(quantity);
                return;
            }

            if ($link.length) {
                $link.hide();
            }

            const $stepper = $(`
                <div class="card-quantity-stepper" data-product-id="${productId}">
                    <button type="button" class="card-qty-button is-decrease" aria-label="Decrease quantity">−</button>
                    <span class="card-qty-value">${quantity}</span>
                    <button type="button" class="card-qty-button is-increase" aria-label="Increase quantity">+</button>
                </div>
            `);

            const $wishlist = $cta.find('.card-wishlist-button, .card-wishlist-form').first();
            if ($wishlist.length) {
                $stepper.insertBefore($wishlist);
            } else {
                $cta.append($stepper);
            }
        };

        $(document).on('click', '.card-qty-button', event => {
            const $button = $(event.currentTarget);
            const $stepper = $button.closest('.card-quantity-stepper');
            const productId = $stepper.data('product-id');
            const delta = $button.hasClass('is-increase') ? 1 : -1;

            if (!productId) {
                return;
            }

            getProductCartItem(productId).then(item => {
                if (!item) {
                    return;
                }

                const nextQty = Math.max(0, Number(item.quantity || 0) + delta);
                const updateCart = () => {
                    syncCartCounter();
                    const $card = $stepper.closest('.card');
                    toggleQuantityControls($card, productId, nextQty);
                };

                if (nextQty === 0) {
                    utils.api.cart.itemRemove(item.id, () => updateCart());
                    return;
                }

                utils.api.cart.itemUpdate(item.id, nextQty, () => updateCart());
            });
        });

        $(document).on('click', 'a[href*="cart.php?action=add"], .card-cta-button[data-product-id]', event => {
            const $link = $(event.currentTarget);
            const href = $link.attr('href') || '';

            if (!href || !href.toLowerCase().includes('cart.php')) {
                return;
            }

            const url = new URL(href, window.location.origin);
            const productId = $link.data('product-id') || url.searchParams.get('product_id');

            if (!productId) {
                return;
            }

            event.preventDefault();

            const formData = new FormData();
            formData.append('action', 'add');
            formData.append('product_id', productId);
            formData.append('qty', '1');

            $link.addClass('is-loading').prop('disabled', true);

            utils.api.cart.itemAdd(formData, (err, response) => {
                $link.removeClass('is-loading').prop('disabled', false);

                const errorMessage = err || (response && response.data && response.data.error);
                if (errorMessage) {
                    window.alert(errorMessage);
                    return;
                }

                getProductCartItem(productId).then(item => {
                    const quantity = item ? Number(item.quantity || 0) : 1;
                    const $card = $link.closest('.card');
                    toggleQuantityControls($card, productId, quantity);
                    syncCartCounter();
                });
            });
        });
    }
}
