const mongoist = require('mongoist');
const { send, json } = require('micro');

require('now-env')

const db = mongoist(process.env.MONGO_URL)

module.exports = async (req, res) => {
    try {
        switch (req.url) {
            case '/projects':
                return await db.projects.distinct("name");
                break;

            case '/insert':
                const body = await json(req);

                if (! body.project_name) {
                    return send(res, 400, 'no project_name');
                }

                if (! body.amount) {
                    return send(res, 400, 'no amount');
                }

                if (! body.person) {
                    return send(res, 400, 'no person');
                }

                return await db.projects.insert({
                    person: body.person,
                    name: body.project_name,
                    amount: body.amount,
                })
                break;

            default:
                send(res, 200, ';)');
                break;
        }
    } catch (err) {
        var msg = { error: true, message: err.message }

        if (process.env.NODE_ENV !== 'production' && err.stack) {
            msg.stack = err.stack;
        }

        send(res, err.statusCode || 500, msg);
    }
}
