export const localStorageService = (function () {
    let _service

    function _getService() {
        if (!_service) {
            _service = this
            return _service
        }
        return _service
    }

    function _setCities(cities) {
        localStorage.setItem('savedCities', cities)
    }

    function _getCities() {
        return localStorage.getItem('savedCities')
    }

    return {
        getService: _getService,
        setCities: _setCities,
        getCities: _getCities
    }
})()