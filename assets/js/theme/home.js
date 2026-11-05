import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import PageManager from './page-manager';

export default class Home extends PageManager {
    onReady() {
        $('[data-kits-section]').each((i, el) => this.loadProducts($(el)));
    }

    loadProducts($section) {
        const $target = $section.find('[data-kits-products]');
        const limit = parseInt($section.data('kitsLimit'), 10) || 4;
        const rawUrl = $section.data('kitsUrl');
        if (!rawUrl) { $section.hide(); return; }

        const path = new URL(rawUrl, window.location.origin).pathname;

        utils.api.getPage(path, {
            template: 'custom/kits-products',
            config: { category: { products: { limit } } },
        }, (err, response) => {
            if (err || !response) {
                console.error('Products load failed', path, err);
                $section.hide();
                return;
            }
            $target.html(response);
            $target.find('li.product').slice(limit).remove();
        });
    }
}