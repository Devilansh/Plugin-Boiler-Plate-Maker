from string import Template
import os, shutil
name = input("Enter Proper Block Name : \n")
name_dash = name.lower().replace(' ','-')
name_class = name.title().replace(' ','_')

if not os.path.exists("blocks-"+name_dash):
    os.makedirs("blocks-"+name_dash)
if not os.path.exists("blocks-"+name_dash+"/lib"):
    os.makedirs("blocks-"+name_dash+"/lib")
s = "C:/xampp/htdocs/blocks/block-"+name_dash+"/src"
d = "C:/xampp/htdocs/capgemini-framework/wp-content/plugins/blocks-"+name_dash+"/src"
shutil.copytree(s,d)
class MyTemplate(Template):
    delimiter = "$$"

def file_create(filename, objec, output):
    my_file = open(filename, "r")
    t = MyTemplate(my_file.read())
    my_file.close()
    result = t.substitute(objec)
    filehand(output, result)

def filehand(output, result):
    f = open(output, "a")
    f.write(result)
    f.close()

# Root File
file_create('files/1.php', {"name_of_block" : name,'class' : name_class}, name_dash + ".php")
shutil.move(name_dash + ".php", "blocks-"+name_dash+"/"+name_dash + ".php")
# Lib Blocks
file_create('files/2.php', {'class' : name_class}, "block-categories.php")
shutil.move('block-categories.php', "blocks-"+name_dash+"/lib/block-categories.php")
# Lib Script
file_create('files/3.php', {"name_dash" : name_dash,'class' : name_class}, "enqueue-scripts.php")
shutil.move('enqueue-scripts.php', "blocks-"+name_dash+"/lib/enqueue-scripts.php")

# Readme.md
file_create('files/4.md', {"name" : name_dash}, "Readme.md")
shutil.move("Readme.md", "blocks-"+name_dash+"/Readme.md")

#Babel config
filehand("babel.config.json", """{"presets": [
    [
      "@babel/preset-env"
    ],
    [
      "@babel/preset-react"
    ]
  ]
}""")
shutil.move("babel.config.json", "blocks-"+name_dash+"/babel.config.json")

#Composer Json
filehand("composer.json", """{
  "name": "cg-blocks/blocks-"""+name_dash+"""",
  "description": \""""+name_dash+"""\",
  "type": "wordpress-plugin",
  "require": {
    "composer/installers": "~1.0"
  }
}""")
shutil.move("composer.json", "blocks-"+name_dash+"/composer.json")

#tsconfig Json
filehand("tsconfig.json", """{
  "compilerOptions": {
    "target": "es6",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "es6",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "react-jsx",
  },
  "include": [
    "./src/**/**/*"
  ]
}""")
shutil.move("tsconfig.json", "blocks-"+name_dash+"/tsconfig.json")

#Package Json
filehand("package.json", """{
  "name": "blocks-"""+name_dash+"""",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "sass": "^1.50.0",
    "uuid": "^8.3.2",
    "@wordpress/block-editor": "^9.8.0",
    "@wordpress/block-library": "^7.15.0",
    "@wordpress/blocks": "^11.17.0",
    "@wordpress/components": "^22.1.0",
    "@wordpress/data": "6.6.1",
    "@wordpress/date": "^4.24.0",
    "@wordpress/element": "^4.20.0",
    "@wordpress/icons": "^9.10.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.5",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-react": "^7.18.6",
    "@babel/preset-typescript": "^7.18.6",
    "@types/jest": "^29.2.3",
    "@types/lodash": "^4.14.191",
    "@types/node": "^18.11.18",
    "@types/react": "^18.0.26",
    "@types/react-dom": "^18.0.9",
    "@types/uuid": "^9.0.0",
    "@wordpress/babel-preset-default": "^7.7.0",
    "babel-loader": "^9.1.0",
    "bootstrap": "^5.2.3",
    "css-loader": "^6.7.3",
    "mini-css-extract-plugin": "^2.7.2",
    "sass-loader": "^13.2.0",
    "ts-loader": "^9.4.2",
    "typescript": "^4.9.4",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}"""
)
shutil.move("package.json", "blocks-"+name_dash+"/package.json")

# webpack.config.js
f = open("files/5.js", 'r')
data = f.read()
f.close()

filehand('webpack.config.js', data)
shutil.move("webpack.config.js", "blocks-"+name_dash+"/webpack.config.js")