var Response = {

    error:function(data,code){
        return this.handleResponse(data,'error');
    },

    success:function(data){
        return this.handleResponse(data,'success');
        // return this.handleSuccessResponse(data, null);
    },

    handleResponse:function(data,type){
        //_status = true means there is an error....
        var _status = false, _resp = [], _msg = '', _count = 0
        if(type == "error") _status = true;
        if(data.resp) _resp = data.resp;
        if(data.msg) _msg = data.msg;
        if(data.total) _count = data.total;

        var response = {'error':_status,'message':_msg,'total':_count,'response':_resp};

        return response;
    }
}

module.exports = Response;