const formatAndSendResponse = (res, resultPromise) => {
    res.setHeader('Content-Type', 'application/json')

    return resultPromise
        .then((result) => {
            return res.json({
                status: 200,
                data: result
            })
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            return res.json({
                status: error.status || 500,
                data: error.data || {},
                errorMessage: error.errorMessage || `${error.original.code} - ${error.name}`
            })
        })
}

export default formatAndSendResponse
