// Saves the current Photoshopfile as a low res jpg, 
// then imports the saved file and places it in a new layer with the blendmode set to difference,
// Then it merges all layers.
// In most cases the result will need some leveling.

var myFile = '~/Documents/Photoshop Difference Script/lowResJPEG.jpg';

function saveJPEG( doc, saveFile, qty ) {
     var saveOptions = new JPEGSaveOptions( );
     saveOptions.embedColorProfile = true;
     saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
     saveOptions.matte = MatteType.NONE;
     saveOptions.quality = qty;
     doc.saveAs( saveFile, saveOptions, true );
}
saveJPEG( app.activeDocument, new File(myFile), 0 );


app.load(new File(myFile));
backFile= app.activeDocument; 
backFile.selection.selectAll();
backFile.selection.copy();
backFile.close(SaveOptions.DONOTSAVECHANGES); 
app.activeDocument.paste();
app.activeDocument.layers[0].name = "BackgroundImage";

app.activeDocument.layers[0].blendMode = BlendMode.DIFFERENCE;
app.activeDocument.mergeVisibleLayers();
