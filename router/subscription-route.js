const { isLoggedIn } = require('../utilities/middleware')

class SubscriptionRouter {
    constructor(express, subscribeService, stripe) {
        this.express = express;
        this.service = subscribeService;
        this.stripe = stripe;
        this.user;
    }

    route() {
        let router = this.express.Router()

        router.get('/subscribe', isLoggedIn, this.getSubscribePage.bind(this))
        router.post('/subscribe', this.subscribe.bind(this))

        return router
    }

    getSubscribePage(req, res) {
        console.log(req.user)
        this.user = req.user
        res.render('subscribe', {
            script: '/js/home.js'
        })
    }

    async subscribe(req, res) {
        const subscription = [
            [1, { priceInCents: 10000, name: '1 month' }],
            [2, { priceInCents: 50000, name: '1 year' }]
        ]

        const product = subscription.filter(s => s[1].name === req.body.subscription)
        console.log(this.user)
        console.log(req.body) // { subscription: '1 month' }
        console.log(product) // [ [ 1, { priceInCents: 10000, name: '1 month' } ] ]

        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment', // or subscription
                line_items: [{
                    price_data: {
                        currency: 'hkd',
                        product_data: {
                            name: product[0][1].name
                        },
                        unit_amount: product[0][1].priceInCents
                    },
                    quantity: 1
                }],
                success_url: `${process.env.SERVER_URL}/login`,
                cancel_url: `${process.env.SERVER_URL}`,
            })
            res.json({ url: session.url })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        //res.json({ url: 'subscribe' })
    }
}

module.exports = SubscriptionRouter
