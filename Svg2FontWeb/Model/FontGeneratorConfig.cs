using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Svg2Font.Api.Model
{
    public class FontGeneratorConfig
    {
        public string FontName { get; set; }
        public string ClasPrefix { get; set; }
        public string ClassSufix { get; set; }
        public bool Ie7 { get; set; }
        public bool Sass { get; set; }
    }
}
