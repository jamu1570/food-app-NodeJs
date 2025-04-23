export const testUserContoller = (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: "test user Data API"
        })
    } catch (error) {
        console.log("Error in API", error)
    }
}