export const getUserForSidebar = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } });
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
}