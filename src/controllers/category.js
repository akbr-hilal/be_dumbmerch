const {category} = require("../../models")

// Add Category
exports.addCategory = async(req, res) => {
    try {
        await category.create(req.body)

        res.status(200).send({
            status: "success",
            message: "Add Category Success"
        })
    } catch (error) {
        console.log(error)
        
        res.status(400).send({
            status: "failed",
            message: "Server Error"
        })
    }
}

// Get Category
exports.getCategories = async(req, res) => {
    try {
        const data = await category.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        })

        res.status(200).send({
            status: "success",
            message: "List Category",
            data
        })
    } catch (error) {
        console.log(error)

        res.status(400).send({
            status: "failed",
            message: "Server Error"
        })
    }
}

// Get Category by Id
exports.getCategory = async (req, res) => {
    try {
        const {id} = req.params
        const data = await category.findAll({
            where: {id}
        })
        res.status(200).send({
            status: "success",
            message: `List category by id ${id}`,
            data
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: "failed",
            message: "Server Error"
        })
    }
}


