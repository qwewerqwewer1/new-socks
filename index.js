var app = new Vue({
  el: '#app',
  data: {
    product: 'Носочки',
    description: 'Пара теплых пушистых носков',
    image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
    link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
    altText: 'Пара носков',
    inStock: 11,
    onSale: true,
    details: ['80% хлопок', '20 полиэстер', 'одинаковые'],
    variants: [
      {
        variantId: 124,
        variantColor: 'green',
      }, 
      {
        variantId: 125,
        variantColor: 'blue',
      }
    ]
  }
})