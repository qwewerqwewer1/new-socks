var app = new Vue({
  el: '#app',
  data: {
    link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
    description: 'Пара теплых пушистых носков',
    altText: 'Пара носков',
    details: ['80% хлопок', '20 полиэстер', 'одинаковые'],
    sizes: [34,37,40],
    product: 'Socks',
    selectedVariant: 0,
    onSale: true,
    variants: [
      {
        variantId: 124,
        variantColor: 'green',
        variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
        variantQuantity: 9,
      },
      {
        variantId: 125,
        variantColor: 'blue',
        variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
        variantQuantity: 0,
      }
    ],
    cart: 0,
  },
  methods: {
    addToCart() {
      this.cart++
    },
    removeFromCart() {
      this.cart--
    },
    updateProduct(i) {
      this.selectedVariant = i
    },
  },
  computed: {
   image() {
    return this.variants[this.selectedVariant].variantImage
   },
   inStock() {
    return this.variants[this.selectedVariant].variantQuantity
   }
  }
})