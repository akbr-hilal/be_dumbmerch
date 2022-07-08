const {transaction, product, user} = require("../../models")


exports.getTransactions = async(req, res) => {
    try {
        const data = await transaction.findAll({
            include: [
                {
                    model: product,
                    as: "product",
                    attributes: {
                        exclude: [
                            "price",
                            "qty",
                            "idUser",
                            "createdAt",
                            "updatedAt"
                        ]
                    }
                },
                {
                    model: user,
                    as: "buyer",
                    attributes: {
                        exclude: [
                            "email",
                            "password",
                            "createdAt",
                            "updatedAt"
                        ]
                    }
                },
                {
                    model: user,
                    as: "seller",
                    attributes: {
                        exclude: [
                            "email",
                            "password",
                            "createdAt",
                            "updatedAt"
                        ]
                    }
                }
            ],
            attributes: {
                exclude: [
                    "idProduct",
                    "idBuyer",
                    "idSeller",
                    "createdAt",
                    "updatedAt"
                ]
            }
        })

        res.status(200).send({
            status: "success",
            message: "List transaction",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: "failed",
            message: "Server Error",
        })
    }
}

exports.addTransaction = async(req, res) => {
    try {
        const data = req.body

        const newTransaction = await transaction.create({
            ...data,
            idBuyer: req.user.id
        })
        
        res.status(200).send({
            status: "success",
            message: "add data transaction finished",
            data: newTransaction
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: "failed",
            message: "Server Error"
        })
    }
}