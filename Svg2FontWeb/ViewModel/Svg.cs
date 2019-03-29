using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Svg2Font.Api.ViewModel
{
    public class GetAllSvgsRequest
    {
    }
    public class GetAllSvgsResponse
    {
        public List<File> Files { get; set; }
        public class File
        {
            public string Name { get; set; }
            public long Size { get; set; }
        }
    }

}
