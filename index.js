Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true,
    }
  },
  template: `
  <ul>
    <li v-for='detail in details'>{{ detail }}</li>
  </ul>
  `,
})

Vue.component("product", {
  props: {
    premium: {
      required: true,
      type: Boolean,
    }
  },
  template: `
  <div class="product">

    <div class='product-image-container'>
      <img class='product-image' v-bind:src='image' v-bind:alt='altText' />
      <div class='variant_container'>
        
        <div class='variant_container_boxes'>
          <div v-for='(variant, i) in variants' 
          v-bind:key="variant.variantId" class='color_box' 
          v-bind:style='{backgroundColor: variant.variantColor}'
          @mouseover="updateProduct(i)">
          </div>
        </div>

        <div class="btn_container">
          <button class='btn' :class='{offBtn: !inStock}' @click="addToCart" :disabled="inStock == false">Добавить в корзину</button>
          <button class='btn' :class='{offBtn: !cart}' @click="removeFromCart" :disabled="cart == 0">Убрать из корзины</button>
          <div class="cart">Количество: {{cart}}</div>
        </div>
        
      </div>
    </div>

    <div class='product_info'>
      
      <div class='info_container'>
        <h1>{{ product }}</h1>
        <p>{{ description }}</p>

        <a v-bind:href='link'>Больше носочков</a>

        <p v-if='inStock > 10'>Еще много</p>
        <p v-else-if='11 > inStock && inStock > 0'>Заканчиваются</p>
        <p :class="{textDecor: !inStock}"v-else>Закончились</p>

        <p>На данный момент {{onSale ? 'в продаже' : 'продажа приостановлена'}}</p>

        <p>Цена: {{isShipping}}</p>
      
        <ul class='sizes'>
          <li class='size' v-for='size in sizes'>{{ size }}</li>
        </ul>

        <product-details :details="details"></product-details>

      </div>

    </div>
  
  </div>
  `,
  data() {
    return {
      link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
      description: "Пара теплых пушистых носков",
      altText: "Пара носков",
      product: "Вонючие носки Глеба",
      sizes: [34, 37, 40],
      selectedVariant: 0,
      onSale: true,
      variants: [
        {
          variantId: 124,
          variantColor: "green",
          variantImage:
            "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
          variantQuantity: 9,
        },
        {
          variantId: 125,
          variantColor: "blue",
          variantImage:
            "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
          variantQuantity: 0,
        },
      ],
      cart: 0,
      details: ["80% хлопок", "20 полиэстер", "одинаковые"],
    }
  },
  methods: {
    addToCart() {
      this.cart++;
    },
    removeFromCart() {
      this.cart--;
    },
    updateProduct(i) {
      this.selectedVariant = i;
    },
  },
  computed: {
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    isShipping() {
      if (this.premium) {
        return 'Бесплатно'
      }
      return '150р'
    }
  },
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
  }
});
