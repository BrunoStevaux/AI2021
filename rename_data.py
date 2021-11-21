# File:     rename_data.py
# Author:   Keegan MacDonald (147813m@acadiau.ca)
# Created:  11/21/2021
# Purpose:  Renames the files in the training_data folder to format used in
#           sketch.js.

import os

# Iterate over digits
for i in range(0, 10):
    cpath = "training_data/" + str(i) + "/"
    files = [f for f in os.listdir(cpath) if os.path.isfile(os.path.join(cpath, f))]
    # Iterate over images of each digit
    k = 0
    for file in files:
        # Rename 
        newname = cpath + str(i) + "-" + str(k) + ".png"
        os.rename(cpath + file, newname)
        os.replace(newname, "training_data/" + str(i) + "-" + str(k) + ".png")
        k += 1
    os.rmdir(cpath)