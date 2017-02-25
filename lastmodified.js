// LAST MODIFIED 
// This works with all Version 4+ Browsers.
// That is IE, Netscape, and Opera.
//
// It is a modification of a program created by: 
// Peter Koch at his web site:
// http://www.xs4all.nl/~ppk/js/index.html
//
// http://www.islandman.org/info/javascript/lastmod
//
document.writeln(lastMod());
function lastMod()
{
   var x = new Date (document.lastModified);
   Modif = new Date(x.toGMTString());
   Year = takeYear(Modif);
   Month = Modif.getMonth();
   Day = Modif.getDate();
   Mod = (Date.UTC(Year,Month,Day,0,0,0))/86400000;
   x = new Date();
   today = new Date(x.toGMTString());
   Year2 = takeYear(today);
   Month2 = today.getMonth();
   Day2 = today.getDate();
   now = (Date.UTC(Year2,Month2,Day2,0,0,0))/86400000;
   daysago = now - Mod;
   if (daysago < 0) return '';
   unit = 'days';
   if (daysago > 730)
   {
    daysago = Math.round(daysago/365);
    unit = 'years';
   }
   else if (daysago > 60)
   {
    daysago = Math.round(daysago/30);
    unit = 'months';
   }
   else if (daysago > 14)
   {
    daysago = Math.round(daysago/7);
    unit = 'weeks'
   }
   towrite = '<p style=\"text-align: right; color:#999999; width: 100%; margin-left:0; font-size: 8pt; font-family: \'arial\', sans-serif\">Page last changed ';
    if (daysago == 0) towrite += 'today.';
   else if (daysago == 1) towrite += 'yesterday.';
   else towrite += daysago + ' ' + unit + ' ago.';
   towrite += '</p>';
   return towrite;
}

function takeYear(theDate)
{
   x = theDate.getYear();
   var y = x % 100;
   y += (y < 80) ? 2000 : 1900;
   return y;
}

