const WISHLIST_STORAGE_KEY = 'wishlist-items';

const getWishlistItems = () => {
    if (!window.localStorage) {
        return [];
    }

    try {
        const storedItems = window.localStorage.getItem(WISHLIST_STORAGE_KEY);

        return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
        return [];
    }
};

const setWishlistItems = items => {
    if (!window.localStorage) {
        return;
    }

    try {
        window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        // Ignore storage errors silently.
    }
};

const isCustomerLoggedIn = () => {
    const $wishlistLink = $('.navUser-item--wishlist [data-wishlist-preview]');

    if (!$wishlistLink.length) {
        return false;
    }

    const href = ($wishlistLink.attr('href') || '').toLowerCase();

    return !href.includes('/login') && !href.includes('login.php');
};

const updateWishlistCounter = count => {
    const $wishlistQuantity = $('.wishlist-quantity');

    if (!$wishlistQuantity.length) {
        return;
    }

    $wishlistQuantity
        .text(count)
        .toggleClass('countPill--positive', count > 0);
};

const renderWishlistDropdown = () => {
    if (!isCustomerLoggedIn()) {
        updateWishlistCounter(0);

        const $dropdown = $('#wishlist-preview-dropdown');

        if ($dropdown.length) {
            $dropdown.empty();
        }

        return;
    }

    const $dropdown = $('#wishlist-preview-dropdown');
    const $wishlistLink = $('.navUser-item--wishlist [data-wishlist-preview]');
    const items = getWishlistItems();
    const wishlistUrl = $wishlistLink.attr('href') || '/wishlist.php';

    updateWishlistCounter(items.length);

    if (!$dropdown.length) {
        return;
    }

    if (!items.length) {
        $dropdown.html(`
            <div class="previewCart">
                <p class="previewCart-empty">Your wishlist is empty.</p>
                <a class="button button--primary" href="${wishlistUrl}">View wishlist</a>
            </div>
        `);

        return;
    }

    const itemMarkup = items.map(item => {
        const imageMarkup = item.image
            ? `<img src="${item.image}" alt="${item.name}" />`
            : '<span class="previewCartItem-placeholder"></span>';

        return `
            <div class="previewCartItem">
                <div class="previewCartItem-image">${imageMarkup}</div>
                <div class="previewCartItem-info">
                    <a href="${item.url || '#'}">${item.name}</a>
                </div>
                <button class="wishlist-remove-item" type="button" data-wishlist-remove="${item.id}" aria-label="Remove ${item.name}">×</button>
            </div>
        `;
    }).join('');

    $dropdown.html(`
        <div class="previewCart">
            <div class="previewCartItems">${itemMarkup}</div>
            <a class="button button--primary" href="${wishlistUrl}">View wishlist</a>
        </div>
    `);
};

const isProductInWishlist = productId => getWishlistItems().some(item => String(item.id) === String(productId));

const syncWishlistButtonState = () => {
    if (!isCustomerLoggedIn()) {
        $('[data-product-id].card-wishlist-button').each((_, button) => {
            const $button = $(button);
            $button
                .removeClass('is-active')
                .attr('aria-pressed', 'false')
                .text('♡');
        });

        return;
    }

    $('[data-product-id].card-wishlist-button').each((_, button) => {
        const $button = $(button);
        const productId = $button.attr('data-product-id');
        const isActive = isProductInWishlist(productId);

        $button
            .toggleClass('is-active', isActive)
            .attr('aria-pressed', String(isActive));

        $button.text(isActive ? '♥' : '♡');
    });
};

const addWishlistProduct = product => {
    if (!product || !product.id || !product.name) {
        return;
    }

    const items = getWishlistItems();
    const hasProduct = items.some(item => String(item.id) === String(product.id));

    if (hasProduct) {
        syncWishlistButtonState();
        return;
    }

    items.unshift({
        id: product.id,
        name: product.name,
        url: product.url || '#',
        image: product.image || '',
    });

    setWishlistItems(items.slice(0, 10));
    renderWishlistDropdown();
    syncWishlistButtonState();
};

const isWishlistRoute = () => {
    const path = (window.location.pathname || '').toLowerCase();

    return path.includes('/wishlist')
        || path.includes('/wishlists')
        || path.includes('/account/wishlist')
        || path.includes('/account/wishlists');
};

const renderLocalWishlistPage = () => {
    if (!isCustomerLoggedIn() || !isWishlistRoute()) {
        $('#local-wishlist-items').remove();

        if ($('.wishlists-table').length) {
            $('.wishlists-table').show();
        }

        if ($('.alert-info').length) {
            $('.alert-info').show();
        }

        return;
    }

    const items = getWishlistItems();
    const $wishlistGrid = $('.wishlistGrid');

    if ($wishlistGrid.length && items.length) {
        const itemMarkup = items.map(item => `
            <li class="product" data-local-wishlist-item="${item.id}">
                <article class="card">
                    <figure class="card-figure">
                        <a href="${item.url || '#'}" class="card-figure__link">
                            <div class="card-img-container">
                                ${item.image ? `<img class="card-image lazyload" src="${item.image}" alt="${item.name}" />` : '<div class="card-image no-image">No Image</div>'}
                            </div>
                        </a>
                    </figure>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="${item.url || '#'}">${item.name}</a>
                        </h4>
                        <div class="card-details">
                            <span class="card-status card-status--in">In stock - arrives tomorrow</span>
                        </div>
                        <div class="card-cta">
                            <a href="${item.url || '#'}" class="button button--default card-cta-button">View product</a>
                            <button type="button" class="button button--small wishlist-page-remove" data-wishlist-remove="${item.id}">Remove</button>
                        </div>
                    </div>
                </article>
            </li>
        `).join('');

        $wishlistGrid.html(itemMarkup);
        return;
    }

    const $wishlistTable = $('.wishlists-table');
    const $alert = $('.alert-info');

    if ($wishlistTable.length) {
        $wishlistTable.hide();
    }

    if ($alert.length) {
        $alert.hide();
    }

    const $localSection = $('#local-wishlist-items');

    if (!items.length) {
        if ($localSection.length) {
            $localSection.remove();
        }

        if ($wishlistTable.length) {
            $wishlistTable.show();
        }

        if ($alert.length) {
            $alert.show();
        }

        return;
    }

    if (!$localSection.length) {
        $('<div id="local-wishlist-items" class="local-wishlist-items"></div>').insertAfter($wishlistTable.length ? $wishlistTable : '.page-heading');
    }

    const $localGrid = $('#local-wishlist-items');
    const localMarkup = items.map(item => `
        <li class="product" data-local-wishlist-item="${item.id}">
            <article class="card">
                <figure class="card-figure">
                    <a href="${item.url || '#'}" class="card-figure__link">
                        <div class="card-img-container">
                            ${item.image ? `<img class="card-image lazyload" src="${item.image}" alt="${item.name}" />` : '<div class="card-image no-image">No Image</div>'}
                        </div>
                    </a>
                </figure>
                <div class="card-body">
                    <h4 class="card-title">
                        <a href="${item.url || '#'}">${item.name}</a>
                    </h4>
                    <div class="card-details">
                        <span class="card-status card-status--in">In stock - arrives tomorrow</span>
                    </div>
                    <div class="card-cta">
                        <a href="${item.url || '#'}" class="button button--default card-cta-button">View product</a>
                        <button type="button" class="button button--small wishlist-page-remove" data-wishlist-remove="${item.id}">Remove</button>
                    </div>
                </div>
            </article>
        </li>
    `).join('');

    $localGrid.html(`<ul class="productGrid wishlistGrid">${localMarkup}</ul>`);
};

const removeWishlistProduct = productId => {
    const items = getWishlistItems().filter(item => String(item.id) !== String(productId));

    setWishlistItems(items);
    renderWishlistDropdown();
    renderLocalWishlistPage();
    syncWishlistButtonState();
};

const createWishlistProductData = $form => {
    const productId = $form.find('[name="product_id"]').val()
        || $form.find('[data-product-id]').attr('data-product-id')
        || $('input[name="product_id"]').val();
    const productName = $form.find('[data-product-name]').attr('data-product-name')
        || $('h1.productView-title').first().text().trim()
        || document.title.trim();
    const productUrl = $form.find('[data-product-url]').attr('data-product-url')
        || window.location.href;
    const productImage = $form.find('[data-product-image]').attr('data-product-image')
        || $('img.productView-image').first().attr('src')
        || '';

    if (!productId || !productName) {
        return null;
    }

    return {
        id: productId,
        name: productName,
        url: productUrl,
        image: productImage,
    };
};

export default function wishlistPreview() {
    if (window.location.pathname.toLowerCase().includes('wishlist') && !isCustomerLoggedIn()) {
        window.location.href = '/login.php';
        return;
    }

    renderWishlistDropdown();
    renderLocalWishlistPage();
    syncWishlistButtonState();

    $(document).on('submit', '[data-wishlist-form], [data-wishlist-add]', event => {
        const $form = $(event.currentTarget);
        const product = createWishlistProductData($form);

        if (product) {
            const hasProduct = isProductInWishlist(product.id);

            if (hasProduct) {
                removeWishlistProduct(product.id);
            } else {
                addWishlistProduct(product);
            }
        }
    });

    $(document).on('click', '[data-wishlist-remove], .wishlist-page-remove, .wishlist-table-clear', event => {
        event.preventDefault();

        const productId = $(event.currentTarget).attr('data-wishlist-remove');

        if (event.currentTarget.classList && event.currentTarget.classList.contains('wishlist-table-clear')) {
            setWishlistItems([]);
            renderWishlistDropdown();
            renderLocalWishlistPage();
            syncWishlistButtonState();
            return;
        }

        if (productId) {
            removeWishlistProduct(productId);
        }
    });

    $(document).on('click', '.card-wishlist-button[data-product-id]', event => {
        event.preventDefault();

        if (!isCustomerLoggedIn()) {
            window.location.href = '/login.php';
            return;
        }

        const $button = $(event.currentTarget);
        const productId = $button.attr('data-product-id');
        const product = {
            id: productId,
            name: $button.attr('data-product-name') || 'Product',
            url: $button.attr('data-product-url') || '#',
            image: $button.attr('data-product-image') || '',
        };

        if (isProductInWishlist(productId)) {
            removeWishlistProduct(productId);
        } else {
            addWishlistProduct(product);
        }
    });
}
