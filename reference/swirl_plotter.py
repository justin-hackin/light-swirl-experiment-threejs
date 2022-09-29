"""Script for generating example of the output of compshapes.py functions 
See `compshapes.py <https://github.com/cosmo-guffa/play-svg/blob/master/playsvg/compshapes.py>`_ for more info on corresponding functions """

import sys
sys.path.append("/home/cosmo/0_Code_0/play-svg-github/play-svg/playsvg")
from geom import *
import bpy
import math

#from playsvg.geom import *

def radialPlots(position, radius, spokes, start , numPoints, passive = 0):
    """
    returns an array of equidistant points on a circle
    """
    plots = []
    for index in range(numPoints):
        plots.append(Point().polerInit(radius, float((start+index)%spokes)/spokes) + position)
    return plots

numCirc=10 #should be even
radius = 3
height = 3
heightIncType = "Trig"
addBottom = True #ignored if symmetric
symmetric = False

pointsInCircle = numCirc+1
heightInc= height*2/numCirc
pointPlots = []

#returns index of vertices at radial position i and level j
def ind(level, circle):
    return int ((circle%numCirc)*pointsInCircle+level)


for i in range(numCirc):
    thisPlot = radialPlots(Point().polerInit(radius, float(i)/numCirc), radius, numCirc,  (i+numCirc/2)%numCirc, pointsInCircle )
    for j in range(len(thisPlot)):
        if heightIncType == "Linear":
            thisPlot[j] = (thisPlot[j].x, thisPlot[j].y, height - heightInc*j )
        elif heightIncType == "Trig":
            thisTheta = (0.25 - float((j+numCirc/2)%numCirc)/numCirc)*tewpi
            percentUp = (math.sin(thisTheta)*radius+radius) / (2*radius) 
            thisHeight = (1-percentUp)*height
            if j > numCirc/2 : thisHeight = -thisHeight
            thisPlot[j] = (thisPlot[j].x, thisPlot[j].y, thisHeight)
        
            
    pointPlots.append(thisPlot)
   
vertices = [x for sublist in pointPlots for x in sublist  ]
vertices.append((0,0,0))
edges = []

faces = []



"""

"""
if symmetric :
    levels = numCirc-1
else: 
    levels = numCirc/2-2
    """
    for j in range(numCirc):
        faces.append((ind(numCirc/2+2,j), ind(numCirc/2+2,j+1), ind(numCirc/2+1, j+2) ))
    """
    
    if addBottom :
        for j in range(numCirc):
            faces.append( (ind(numCircles/2-1,j) , len(vertices)-1, ind(numCircles/2-1, j+1)) )
          
    

for i in range(0,int(levels)):
    for j in range(numCirc):
        faces.append((ind(i,j), ind(i+1, j), ind(i+2,j-1), ind(i+1, j-1) )  )
        




"""
print "Verts:\n"+str(vertices)
print "Verts length:\n"+str(len(vertices))
 
print "Faces:\n"+str(faces)
"""    


zome_mesh = bpy.data.meshes.new("zome_mesh")  # create new, empty mesh
zome_mesh.from_pydata(vertices, edges, faces) # fill mesh with prepared data
zome_object = bpy.data.objects.new("zome_object", zome_mesh)  # create new object from mesh
scene = bpy.context.scene # get current scene
scene.objects.link(zome_object) # link new object to current scene
