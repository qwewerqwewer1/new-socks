var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    description: 'Пара теплых пушистых носков',
    image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
    link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
    altText: 'Пара носков',
    inStock: false,
    onSale: true,
    details: ['80% хлопок', '20 полиэстер', 'одинаковые'],
    sizes: [34,37,40],
    variants: [
      {
        variantId: 124,
        variantColor: 'green',
        variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg'
      },
      {
        variantId: 125,
        variantColor: 'blue',
        variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg'
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
    updateImage(newImage) {
      this.image = newImage
    },
    
    
  },
  computed: {
    
  }
})