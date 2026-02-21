/* Order Now & Checkout - Thegracebaker */

var OrderNow = (function() {
    var CART_KEY = 'thegracebaker_cart';

    function getCart() {
        try {
            var raw = sessionStorage.getItem(CART_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(items) {
        sessionStorage.setItem(CART_KEY, JSON.stringify(items || []));
    }

    function addToCart(id, name, price, qty, image) {
        var cart = getCart();
        var i = cart.findIndex(function(item) { return item.id === id; });
        qty = parseInt(qty, 10) || 1;
        if (i >= 0) {
            cart[i].qty += qty;
        } else {
            cart.push({ id: id, name: name, price: parseFloat(price), qty: qty, image: image || '' });
        }
        saveCart(cart);
        return cart;
    }

    function removeFromCart(id) {
        var cart = getCart().filter(function(item) { return item.id !== id; });
        saveCart(cart);
        return cart;
    }

    function updateQty(id, qty) {
        if (qty < 1) return removeFromCart(id);
        var cart = getCart();
        var i = cart.findIndex(function(item) { return item.id === id; });
        if (i >= 0) {
            cart[i].qty = parseInt(qty, 10) || 1;
            saveCart(cart);
        }
        return cart;
    }

    function getCartTotal() {
        var cart = getCart();
        var total = 0;
        cart.forEach(function(item) { total += item.price * item.qty; });
        return { count: cart.reduce(function(s, i) { return s + i.qty; }, 0), total: total, items: cart };
    }

    function renderPackages(container, packages) {
        if (!container || !packages || !packages.length) return;
        container.innerHTML = packages.map(function(p, i) {
            return (
                '<div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="' + (i % 6 * 50) + '">' +
                '  <div class="package-card">' +
                '    <div class="package-image" style="background-image:url(\'' + (p.image || '') + '\')"></div>' +
                '    <div class="package-body">' +
                '      <h3 class="package-title">' + (p.name || '') + '</h3>' +
                '      <p class="package-desc">' + (p.desc || '') + '</p>' +
                '      <div class="package-price">$' + (p.price || 0).toFixed(2) + '</div>' +
                '      <div class="package-actions">' +
                '        <input type="number" class="qty-input" min="1" value="1" data-pkg-id="' + (p.id || '') + '" aria-label="Quantity">' +
                '        <button type="button" class="btn-add btn-add-pkg" data-id="' + (p.id || '') + '" data-name="' + (p.name || '').replace(/"/g, '&quot;') + '" data-price="' + (p.price || 0) + '" data-image="' + (p.image || '').replace(/"/g, '') + '">Add to cart</button>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>'
            );
        }).join('');

        container.querySelectorAll('.btn-add-pkg').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = btn.getAttribute('data-id');
                var name = btn.getAttribute('data-name');
                var price = btn.getAttribute('data-price');
                var image = btn.getAttribute('data-image') || '';
                var card = btn.closest('.package-card');
                var input = card ? card.querySelector('.qty-input') : null;
                var qty = input ? parseInt(input.value, 10) || 1 : 1;
                addToCart(id, name, price, qty, image);
                if (input) input.value = 1;
                updateCartBar();
            });
        });
    }

    function updateCartBar() {
        var bar = document.getElementById('cartBar');
        var countEl = document.getElementById('cartCount');
        if (!bar || !countEl) return;
        var t = getCartTotal();
        if (t.count > 0) {
            countEl.textContent = t.count + ' item(s) · $' + t.total.toFixed(2);
            bar.classList.add('show');
        } else {
            bar.classList.remove('show');
        }
    }

    function initOrderPage() {
        updateCartBar();
    }

    return {
        getCart: getCart,
        saveCart: saveCart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        updateQty: updateQty,
        getCartTotal: getCartTotal,
        renderPackages: renderPackages,
        initOrderPage: initOrderPage,
        CART_KEY: CART_KEY
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('packagesGrid')) {
        OrderNow.initOrderPage();
    }
});
