const {
    product,
    user,
    transaction,
    category,
    productcategory,
} = require("../../models");

// GET PRODUCT ALL
exports.getProducts = async (req, res) => {
    try {
        let data = await product.findAll({
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["id", "password", "createdAt", "updatedAt"],
                    },
                },
                {
                    model: transaction,
                    as: "transaction",
                    include: [
                        {
                            model: user,
                            as: "buyer",
                            attributes: {
                                exclude: [
                                    "id",
                                    "email",
                                    "password",
                                    "createdAt",
                                    "updatedAt",
                                ],
                            },
                        },
                        {
                            model: user,
                            as: "seller",
                            attributes: {
                                exclude: [
                                    "id",
                                    "email",
                                    "password",
                                    "createdAt",
                                    "updatedAt",
                                ],
                            },
                        },
                    ],
                    attributes: {
                        exclude: ["id", "idProduct", "createdAt", "updatedAt"],
                    },
                },
                {
                    model: category,
                    as: "category",
                    through: {
                        model: productcategory,
                        as: "bridge",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        data = JSON.parse(JSON.stringify(data))

        data = data.map((items) => {
            return {
                ...items,
                img: process.env.PATH_FILE + items.img
            }
        })

        res.status(200).send({
            status: "success",
            message: "List Product",
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "Server Error",
        });
    }
};

// GET PRODUCT BY NAME
exports.getProduct = async (req, res) => {
    try {
        const { name } = req.params;
        let data = await product.findAll({
            where: { name },
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["id", "password", "createdAt", "updatedAt"],
                    },
                },
                {
                    model: transaction,
                    as: "transaction",
                    include: [
                        {
                            model: user,
                            as: "buyer",
                            attributes: {
                                exclude: [
                                    "id",
                                    "email",
                                    "password",
                                    "createdAt",
                                    "updatedAt",
                                ],
                            },
                        },
                        {
                            model: user,
                            as: "seller",
                            attributes: {
                                exclude: [
                                    "id",
                                    "email",
                                    "password",
                                    "createdAt",
                                    "updatedAt",
                                ],
                            },
                        },
                    ],
                    attributes: {
                        exclude: ["id", "idProduct", "createdAt", "updatedAt"],
                    },
                },
                {
                    model: category,
                    as: "category",
                    through: {
                        model: productcategory,
                        as: "bridge",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        data = JSON.parse(JSON.stringify(data))

        data = data.map((items) => {
            return {
                ...items,
                img: process.env.PATH_FILE + items.img
            }
        })

        res.status(200).send({
            status: "success",
            message: "List Product",
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "Server Error",
        });
    }
};

// ADD PRODUCT
exports.addProduct = async (req, res) => {
    try {
        const {category: categoryName, ...data} = req.body

        const newProduct = await product.create({
            ...data,
            img: req.file.filename,
            idUser: req.user.id
        });

        const categoryData = await category.findOne({
            where: {
                name: categoryName
            }
        })
        if (categoryData){
            await productcategory.create({
                idCategory: categoryData.id,
                idProduct: newProduct.id
            })
        } else {
            const newCategory = await category.create({name: categoryName})
            await productcategory.create({
                idCategory: newCategory.id,
                idProduct: newProduct.id
            })
        }
        
        let productData = await product.findOne({
            where: {
                id: newProduct.id
            },
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: [
                            "createdAt",
                            "updatedAt",
                            "password"
                        ]
                    }
                },
                {
                    model: category,
                    as: "category",
                    through: {
                        model: productcategory,
                        as: "bridge",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt"
                ]
            }
        })

        productData = JSON.parse(JSON.stringify(productData))

        productData = {
            ...productData,
            img: process.env.PATH_FILE + productData.img
        }

        res.status(200).send({
            status: "success",
            message: "add data product finished",
            data: productData
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "Server Error",
        });
    }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    try {
        const { name } = req.params;
        await product.update(req.body, {
            where: { name },
        });
        res.status(200).send({
            status: "success",
            message: `Update data product ${name} finished`,
            data: req.body,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "Server Error",
        });
    }
};

// DELETE PRODUCT
exports.delProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await product.destroy({
            where: { id },
        });
        res.status(200).send({
            status: "success",
            message: `Delete product id ${id} success`,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "Server Error",
        });
    }
};
