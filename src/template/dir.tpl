<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body { 
            margin: 30px;
        }
        .div {          
            margin: 10px;
            line-height: 60px;
        }
        a {
            font-size: 20px;
            margin: 20px;
            vertical-align: top;
            color: #626262;
        }
        img {
            width: 40px;
            height: 40px;
            margin: 10px;
            vertical-align: top;
        }
    </style>
</head>
<body>
    {{#each directoryType}}
    <div class="div">
        {{#if type}}
            <img src="/src/images/file.png" alt="">
        {{else}}
            <img src="/src/images/folder.png" alt="">
        {{/if}}
        <a href="{{../dir}}/{{file}}">{{file}}</a>
    </div>
    {{/each}}
</body>
</html>