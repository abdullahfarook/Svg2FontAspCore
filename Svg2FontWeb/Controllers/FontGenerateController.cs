using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Svg2Font.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FontGenerateController : ControllerBase
    {
        private string nodeApp = "./svg2font/main";
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<string>> GenerateFont([FromServices] INodeServices nodeServices)
        {
            var result = await nodeServices.InvokeExportAsync<string>(nodeApp, "Main", new { });
            return result;

            //return new string[] { "value1", "value2" };
        }

    }
}
