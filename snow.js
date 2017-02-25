  //Configure below to change URL path to the snow image
  var snowsrc="snow.gif"
  // Configure below to change number of snow to render
  var flakes = 12;

  var dx, xp, yp;    // coordinate and position variables
  var am, stx, sty;  // amplitude and step variables
  var i, doc_width = 800, doc_height = 600;

	if (document.getElementById)
	{
		if(document.body.clientWidth)
		{
			doc_width = document.body.clientWidth;
			doc_height = document.body.clientHeight;
		}
		else
		{
			doc_width = window.innerWidth;
			doc_height = window.innerHeight;
		}
	}
  
  dx = new Array();
  xp = new Array();
  yp = new Array();
  am = new Array();
  stx = new Array();
  sty = new Array();

  for (i = 0; i < flakes; ++ i) 
  {
		dx[i] = 0;                        // set coordinate variables
		xp[i] = Math.random()*(doc_width-50);  // set position variables
		yp[i] = Math.random()*doc_height;
		am[i] = Math.random()*20;         // set amplitude variables
		stx[i] = 0.02 + Math.random()/10; // set step variables
		sty[i] = 0.7 + Math.random();     // set step variables
		document.write("<div id=\"dot"+ i +"\" style=\"POSITION: absolute; Z-INDEX: "+ i +"; VISIBILITY: visible; TOP: 15px; LEFT: 15px;\"><img src='"+snowsrc+"' border=\"0\"></div>");
  }
  snowIE_NS6();
  
  function snowIE_NS6() 
  {  // IE and NS6 main animation function
    for (i = 0; i < flakes; ++ i) 
    { 
      yp[i] += sty[i];
      if (yp[i] > doc_height-50) 
      {
        xp[i] = Math.random()*(doc_width-am[i]-30);
        yp[i] = 0;
        stx[i] = 0.02 + Math.random()/10;
        sty[i] = 0.7 + Math.random();
		if(document.body.clientWidth)
		{
			doc_width = document.body.clientWidth;
			doc_height = document.body.clientHeight;
		}
		else
		{
			doc_width = window.innerWidth;
			doc_height = window.innerHeight;
		}
    dx[i] += stx[i];
    document.getElementById("dot"+i).style.top=yp[i];
    document.getElementById("dot"+i).style.left=xp[i] + am[i]*Math.sin(dx[i]);
    }
  }
  setTimeout("snowIE_NS6()", 40);

