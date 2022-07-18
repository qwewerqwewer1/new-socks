var eventBus = new Vue()

Vue.component("product", {
  props: {
    premium: {
      required: true,
      type: Boolean,
    },
    cart: {
      required: true,
      type: Array,
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
          <button class='btn' :class='{offBtn: cart == 0}' @click="removeFromCart" :disabled="cart == 0">Убрать из корзины</button>
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

        <ul>
          <li v-for='detail in details'>{{ detail }}</li>
        </ul>

      </div>

      <product-tabs :reviews='reviews'></product-tabs>

    </div>
    
  </div>
  `,
  data() {
    return {
      link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
      description: "Пара теплых пушистых носков",
      altText: "Пара носков",
      product: "Носки",
      sizes: [34, 37, 40],
      selectedVariant: 0,
      onSale: true,
      variants: [
        {
          variantId: 124,
          variantColor: "green",
          variantImage:
            "./img/green-socks.jpg",
          variantQuantity: 9,
        },
        {
          variantId: 125,
          variantColor: "blue",
          variantImage:
            "./img/blue-socks.jpg",
          variantQuantity: 2,
        },
      ],
      details: ["80% хлопок", "20 полиэстер", "одинаковые"],
      reviews: [],
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
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
  mounted() {
    eventBus.$on('review-submitted', function (productReview) {
      this.reviews.push(productReview)
    }.bind(this))
  },
});


Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: false,
    }
  },
  template: `
  <div>
    <span class='tabs' :class='{activeTab: selectedTab === tab}'
      v-for="(tab, index) in tabs" :key='index'
      @click='selectedTab = tab'>
        {{ tab }}
      </span>

      <div v-show="selectedTab === 'Отзывы'">
          <p v-if='!reviews.length'>Пожелания отсутствуют</p>
          <ul>

            <li v-for='review in reviews'>
              <p>Имя: {{ review.name }}</p>
              <p>Отзыв: {{ review.review }}</p>
              <p>Оценка: {{ review.rating }}</p>
              <p>Рекомендация: {{ review.rec ? 'Да' : 'Нет' }}</p>
            </li>

          </ul>
        </div>

        <product-review v-show='selectedTab === "Оставить отзыв"'></product-review>
  </div>
  `,
  data() {
    return {
      tabs: ['Отзывы', 'Оставить отзыв'],
      selectedTab: 'Отзывы',
    }
  },
})

Vue.component('product-review', {
  template: `
    <form class='review-form' @submit.prevent='onSubmit'>
      <p>
        <label for='name'>Имя: </label>
        <input maxlength='10' id='name' v-model='name' placeholder='name'/>
      </p>
      <p>
        <label for='review'>Отзыв: </label>
        <textarea cols='19' rows='5' maxlength='80' id='review' v-model='review'></textarea>
      </p>
      <p>
        <label for="rating">Оценка: </label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
        
      <p>
        <label for='rec'>Вы бы порекомендовали этот товар?</label>
        <input type='checkbox' id='rec' v-model='rec'/>
      </p>

      <p>
        <input type='submit' value='Submit'>
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      rec: false,
      errors: [],
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          rec: this.rec,
        }
        eventBus.$emit('review-submitted', productReview)
      } else {
        if (!this.name) this.errors.push('Введи имя =)')
        if (!this.review) this.errors.push('Введите отзыв!')
        if (!this.rating) this.errors.push('Рейтинг, ну как же без него :)')
      }
      this.name = null
      this.review = null
      this.rating = null
    }
  },
})

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(idCart) {
      this.cart.push(idCart)
    },
    downgradeCart(idCart) {
      for (let i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === idCart) {
          this.cart.splice(i, 1);
          return
        }
      }
    }
  },
});