import pkg from "@woocommerce/woocommerce-rest-api";
const WooCommerceRestApi = (pkg as any).default;

export default defineEventHandler(async (event) => {
    console.log(WooCommerceRestApi);

    const api = new WooCommerceRestApi({
        url: "https://www.jiesdesign.com",
        consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
        consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
        version: "wc/v3",
    });

    const endpoint = getRouterParam(event, "endpoint");
    if (!endpoint) {
        return new Response("Endpoint not found", { status: 404 });
    }

    const body = await readBody(event);
    const response = await api.post(endpoint, body);

    return new Response(JSON.stringify(response.data), {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    });
});
