/*
Saves the current Photoshopfile as a low res jpg, 
then imports the saved file and places it in a new layer with its blendmode set to difference,
and finally it merges all visible layers.
In most cases the result will need some leveling.
*/

// stating the obvious, but change this path to match your machine
var myFile = '~/Desktop/lowResJPEG.jpg';

// save the lowres jpeg
function saveJPEG(doc, saveFile, qty) {
     var saveOptions = new JPEGSaveOptions();
     saveOptions.embedColorProfile = true;
     saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
     saveOptions.matte = MatteType.NONE;
     saveOptions.quality = qty;
     doc.saveAs(saveFile, saveOptions, true);
}
saveJPEG( app.activeDocument, new File(myFile), 0);

// open the lowres jpeg, place it into new layer and set blendmode to difference
app.load(new File(myFile));
backFile = app.activeDocument; 
backFile.selection.selectAll();
backFile.selection.copy();
backFile.close(SaveOptions.DONOTSAVECHANGES); 
app.activeDocument.paste();
app.activeDocument.layers[0].name = "BackgroundImage";
app.activeDocument.layers[0].blendMode = BlendMode.DIFFERENCE;
app.activeDocument.mergeVisibleLayers();
