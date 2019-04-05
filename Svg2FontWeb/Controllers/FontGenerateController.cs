using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.StaticFiles;
using Svg2Font.Api.ViewModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Svg2Font.Api.Controllers
{
    [Route("api/font")]
    [ApiController]
    public class FontGenerateController : ControllerBase
    {
        private string nodeApp = "./svg2font/main";
        private IHostingEnvironment _hostingEnv;
        public FontGenerateController(IHostingEnvironment env)
        {
            _hostingEnv = env;
        }
        //[HttpGet]
        //[Route("generate")]
        //public async Task<HttpResponseMessage> GenerateFont([FromServices] INodeServices nodeServices)
        //{
        //    try
        //    {
        //        var filePath = _hostingEnv.WebRootPath + $@"\font\icoons.zip";
        //        if (System.IO.File.Exists(filePath))
        //        {
        //            System.IO.File.Delete(filePath);
        //        }   
        //        var result = await nodeServices.InvokeExportAsync<string>(nodeApp, "Main", new { });
        //        var content = System.IO.File.ReadAllBytes(filePath);
        //        HttpResponseMessage response;
        //        if (content.Length > 0)
        //        {
        //            response = new HttpResponseMessage
        //            {
        //                StatusCode = System.Net.HttpStatusCode.OK,
        //                Content = new ByteArrayContent(content)
        //            };
        //            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
        //            response.Content.Headers.ContentDisposition.FileName = "icoons.zip";
        //            //response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
        //            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/zip    ");
        //            response.Content.Headers.ContentLength = content.Length;
        //            return response;
        //        }
        //        else
        //        {
        //            response = new HttpResponseMessage
        //            {
        //                StatusCode = System.Net.HttpStatusCode.NotFound,
        //            };
        //            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json; charset=utf-8");
        //            return response;
        //            Response.Clear();
        //            Response.ContentType = "application/json; charset=utf-8";
        //            Response.StatusCode = 404;
        //            Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "No Content";
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        Response.Clear();
        //        Response.ContentType = "application/json; charset=utf-8";
        //        Response.StatusCode = 400;
        //        //Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "No Content";
        //        Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = e.Message;
        //    }
        //    return null;
        //    //return new string[] { "value1", "value2" };
        //}

        [HttpGet]
        [Route("generate")]
        public async Task<IActionResult> GenerateFont([FromServices] INodeServices nodeServices, [FromQuery] GetFontRequest req)
        {
            var filePath = _hostingEnv.WebRootPath + $@"\font\icoons.zip";
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
            var result = await nodeServices.InvokeExportAsync<string>(nodeApp, "Main", req);
            var content = System.IO.File.ReadAllBytes(filePath);
            var fileProvider = new FileExtensionContentTypeProvider();
            fileProvider.TryGetContentType("icoons.zip", out string contentType);
            return File(content, contentType);

        }

    }
}
