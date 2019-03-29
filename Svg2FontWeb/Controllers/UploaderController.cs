using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.FileProviders;
using Svg2Font.Api.ViewModel;

namespace Svg2FontWeb.Controllers
{
    [Route("api/Uploader")]
    [ApiController]
    public class UploaderController : ControllerBase
    {
        private IHostingEnvironment _hostingEnv;
        private IFileProvider _fileProvider;
        public UploaderController(IHostingEnvironment env,IFileProvider fileProvider)
        {
            this._hostingEnv = env;
            this._fileProvider = fileProvider;
        }
        [HttpPost]
        //[HttpOptions]
        [Route("Save")]
        public IActionResult Save(IList<IFormFile> none)
        {
           
            try
            {
                var UploadFiles = Request.Form.Files;
                foreach (var file in UploadFiles)
                {
                    if (UploadFiles != null)
                    {
                        var filename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        filename = _hostingEnv.WebRootPath + $@"\svg\{filename}";
                        if (!System.IO.File.Exists(filename))
                        {
                            using (FileStream fs = System.IO.File.Create(filename))
                            {
                                file.CopyTo(fs);
                                fs.Flush(); 
                            }
                        }
                        else
                        {
                            Response.Clear();
                            Response.StatusCode = 400;
                            Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "File already exists.";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Response.Clear();
                Response.ContentType = "application/json; charset=utf-8";
                Response.StatusCode = 204;
                Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "No Content";
                Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = e.Message;
            }
            return Content("");
        }
        [HttpPost]
        //[HttpOptions]
        [Route("Remove")]
        public IActionResult Remove(IList<IFormFile> none)
        {
            try
            {
                var UploadFiles = Request.Form.Files;
                var fileNames = Request.Form["filenames"];
                foreach (var fileName in fileNames)
                {
                    var filePath = _hostingEnv.WebRootPath + $@"\svg\{fileName}";
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                    else
                    {
                        throw null;
                    }
                }
            }
            catch (Exception e)
            {
                Response.Clear();
                Response.StatusCode = 200;
                Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "File removed successfully";
                Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = e.Message;
            }
            return Content("");
        }
        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAll([FromQuery]GetAllSvgsRequest input)
        {
            IDirectoryContents contents = _fileProvider.GetDirectoryContents("wwwroot/svg");

            var lastModified =
                      contents.ToList()
                      .Where(f => !f.IsDirectory)
                      .OrderByDescending(f => f.LastModified)
                      .ToList();
            return Ok(new GetAllSvgsResponse { Files = lastModified
                .Select(f => new GetAllSvgsResponse.File
                {
                    Name = f.Name,
                    Size = f.Length
                })
                .ToList() });
        }
    }
}
