using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Svg2Font.Api.Core
{
    public class ResponseCode : Attribute, IResultFilter
    {
        private readonly int _statusCode;
        public ResponseCode(int statusCode)
        {
            this._statusCode = statusCode;
        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
        }
        public void OnResultExecuted(ResultExecutedContext context)
        {
            context.HttpContext.Response.StatusCode = _statusCode;
        }
    }
}
