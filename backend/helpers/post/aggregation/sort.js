const sort_by_date_created = {
    $sort: {
        createdAt: -1
    }
};

module.exports = {
    sort_by_date_created
};