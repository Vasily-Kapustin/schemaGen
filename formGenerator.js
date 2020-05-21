
var superSets={};
var superSchemas={};
var useCsrf=false;
var csrfToken="";
var editData= {};
var elements= {};
var validator={};
elements.text = function (name, label,edit) {
    var str ='';
    var ro="";
    var value="";
    console.log(edit);
    if(edit!=undefined){
        value=edit.value;
        if(edit.edit==false){
            ro="readonly";
        }
    }
    var a =' <div class="form-group"><label>';
    var b ='</label><input type="text" class="form-control" name="'+ name + '" placeholder="Text" value="'+value+'" '+ro+'><div></div></div>';
    str+=a+label+b;
    return str;
};
elements.email = function (name, label,edit,confirm) {
    var str ='';
    var ro="";
    var value="";
    console.log(edit);
    if(edit!=undefined){
        value=edit.value;
        if(edit.edit==false){
            ro="readonly";
        }
    }
    var a ='<div class="form-group"><label>';
    var b ='</label><input type="email" class="form-control" name="'+ name + '" aria-describedby="emailHelp" placeholder="Enter email" value="'+value+'" '+ro+'><div></div></div>';
    str+=a+label+b;
    if(confirm){
        str+=a+'Confirm '+label+'</label><input type="email" class="form-control" name="'+ name + 'confirm" aria-describedby="emailHelp" placeholder="Enter email"><div></div></div>';
    }
    return str;
};
elements.password = function (name, label,edit,confirm) {
    var str ='';
    if(edit==undefined){
        var a ='<div class="form-group"><label>';
        var b ='</label><input type="password" class="form-control" name="'+ name + '" placeholder="Password"><div></div></div>';
        str+=a+label+b;
        if(confirm){
            str+=a+'Confirm '+label+'</label><input type="password" class="form-control" name="'+ name + 'confirm" placeholder="Password"><div></div></div>';
        }
    }else if(edit.edit==true){
        var a ='<div class="form-group"><label>';
        var b ='</label><input type="text" class="form-control" name="'+ name + '" placeholder="Password" value="'+edit.value+'"><div></div></div>';
        str+=a+label+b;
    }else{
        var a ='<div class="form-group"><label>';
        var b ='</label><input type="text" class="form-control" name="'+ name + '" placeholder="Password" readonly value="'+edit.value+'"><div></div></div>';
        str+=a+label+b;
    }
    return str;
};
elements.checkbox = function (name, label,edit) {
    var str ='';
    var ro="";
    var val="";
    if(edit!=undefined){
        if(edit.value==1){
            val="checked";
        }
        if(edit.edit==false){
            ro="disabled";
        }
    }
    var a ='<div class="form-check"><label class="form-check-label" ><input type="checkbox" class="form-check-input" '+val+' '+ ro+' name="'+ name + '"><div></div>';
    var b ='</label></div>';
    str+=a+label+b;
    return str;
};
elements.textarea = function (name, label,edit) {
    var str ='';
    var ro="";
    var val="";
    if(edit!=undefined){
        val =edit.value;
        if(edit.edit==false){
            ro="disabled";
        }
    }
    var a ='<div class="form-group"><label for="exampleFormControlTextarea1">';
    var b ='</label><textarea class="form-control" name="'+ name + '" rows="3" '+ro+'>'+val+'</textarea><div></div></div>';
    str+=a+label+b;
    return str;
};
elements.select = function (name, label,edit,options) {
    var str ='';
    var a ='<div class="form-group"><label for="exampleFormControlSelect1">';
    var b ='</label><select class="form-control" name="'+ name + '">\n';
    str+=a+label+b;
    for(var i = 0;i<options.length;i++){
        var sel='';
        var dis='';
        if(edit!=undefined){
            if(edit.value==options[i]) {
                sel = 'selected="selected"';
            }
            if(edit.value!=options[i]&&edit.edit==false) {
                dis = 'disabled';
            }
        }
        str+='<option '+sel +' '+ dis +'>';
        str+=options[i];
        str+='</option>';
    }
    str += '</select><div></div></div>';
    return str;
};
elements.year = function (name, label,edit,options) {
    var str ='';
        var a ='<div class="form-group"><label for="exampleFormControlSelect1">';
        var b ='</label><select class="form-control" name="'+ name + '">\n';
        str+=a+label+b;
        var start=parseInt(options[0]);
        var end =0;
        var dt = new Date();
        if(options[1]=="CY"){
            end = dt.getFullYear();
        }else{
            end = parseInt(options[1]);
        }
        for(var i = start;i<(end+1);i++){
            if(edit!=undefined){
                if(edit.edit==true){
                    if(edit.value==i){
                        str+='<option selected="selected">';
                        str+=i;
                        str+='</option>';
                    }else{
                        str+='<option>';
                        str+=i;
                        str+='</option>';
                    }
                }else{
                    if(edit.value==i) {
                        str+='<option selected="selected">';
                        str+=i;
                        str+='</option>';
                    }
                }
            }else{
                str+='<option>';
                str+=i;
                str+='</option>';
            }
        }
        str += '</select><div></div></div>';
    return str;
};
elements.date = function (name, label,edit) {
    var str = '';
    if(edit==undefined){
        var val="";
        var a = '<div class="form-group"><label for="exampleDate">';
        var b = ' </label><div id="datepicker" class="input-group date">\n' +
            '    <input type="text" name="' + name + '" class="form-control" placeholder="MM/DD/YYYY"'+val+'><div></div>\n' +
            '    <div class="input-group-addon">\n' +
            '        <span class="glyphicon glyphicon-th"></span>\n' +
            '    </div>\n' +
            '</div></div>\n';
        str += a + label + b;
    }else{
        if(edit.edit=true){
            var date = new Date(edit.value);
            var strd = date.getMonth() +'/'+ date.getDate()+'/'+date.getFullYear();
            val='value="'+strd+'"';
            var a = '<div class="form-group"><label for="exampleDate">';
            var b = ' </label><div id="datepicker" class="input-group date">\n' +
                '    <input type="text" name="' + name + '" class="form-control" placeholder="MM/DD/YYYY"'+val+'><div></div>\n' +
                '    <div class="input-group-addon">\n' +
                '        <span class="glyphicon glyphicon-th"></span>\n' +
                '    </div>\n' +
                '</div></div>\n';
            str += a + label + b;
        }else {
            var date = new Date(edit.value);
            var strd = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
            var a = ' <div class="form-group"><label>';
            var b = '</label><input type="text" class="form-control" name="' + name + '" placeholder="Text" value="' + strd + '" readonly><div></div></div>';
            str += a + label + b;
        }
    }
    return str;
};

validator.email = function(email){
   var ret={res:"",err:"",ptr:""};
   if(!email.includes("@")){
       ret.res="fail";
       ret.err="Please enter an email address";
   }
   else if(!email.includes(".")){
       ret.res="fail";
       ret.err="Please enter an email address";
   }else{
       ret.res="success";
   }
    return ret;
};

validator.password = function(password){
    var ret={res:"",err:"",ptr:""};
    if(password.length<4){
        ret.res="fail";
        ret.err="Please make a longer password";
    } else{
        ret.res="success";
    }
    return ret;
};

validator.NE = function(text){
    var ret={res:"",err:"",ptr:""};
    if(text.length<1){
        ret.res="fail";
        ret.err="Please type something in";
    } else{
        ret.res="success";
    }
    return ret;
};

module.exports ={
    buildForm:function(model,format,url){
        var str="<form id='schemaJS' url='"+url+"'>";
        var set=[];
        var superSch={};
        var buttonLabel="";
        superSch = superSchemas[model];
        var sets = superSets[model];
        set = sets[format];
        var editOveride=false;
        for(var i =0;i<set.length;i++) {
            if (set[i].data == "settings") {
                if(set[i].edit=='all'){
                    editOveride=true;
                }
            }
        }
        for(var i =0;i<set.length;i++) {
                if (set[i].data != "settings") {
                    var edit = set[i].edit;
                    if(edit!=undefined||editOveride){
                        var te= edit;
                        edit={};
                        edit.edit=te;
                        edit.value=editData[set[i].data];
                    }
                    var single = superSch[set[i].data];
                    var label = single[1].label;
                    var confirm = set[i].confirm;
                    var options = single[1].options;
                    if (confirm != undefined) {
                        if (options != undefined) {
                            str += elements[single[1].inputType](set[i].data,label, edit, options, confirm);
                        } else {
                            str += elements[single[1].inputType](set[i].data,label, edit, confirm);
                        }
                    } else {
                        if (options != undefined) {
                            str += elements[single[1].inputType](set[i].data,label, edit, options);
                        } else {
                            str += elements[single[1].inputType](set[i].data,label, edit);
                        }
                    }
                }else{
                    buttonLabel= set[i].buttonLabel;
                }
            }
            if(useCsrf){
                str+='<input type="text" style="display: none;" name="_csrf" value="'+csrfToken+'">';
            }
            if(buttonLabel!=""){
                str+='<button type="submit" id="submit" class="btn btn-primary">'+ buttonLabel+'</button>';
            }
            str += "</form>"
        return str;
    },
    extract:function(model,format,body){
        var data={};
        var set=[];
        var sets = superSets[model];
        set = sets[format];
        var superSch={};
        superSch = superSchemas[model];
        console.log(set);
        for(var i =0;i<set.length;i++){
            if(set[i].data!="settings") {
                if(set[i].edit!=false&&superSch[set[i].data][1].uneditable!=true) {
                    data[set[i].data] = body[set[i].data];
                    if (set[i].confirm == true) {
                        var temp = body[set[i].data + 'confirm'];
                        data[set[i].data + 'confirm'] = temp;
                    }
                }
            }
        }
        return data;
    },
    validate:function(model,data){
        var err ={res:"success",err:[]};
        var errs=[];
        var superSch={};
        superSch = superSchemas[model];
        Object.keys(data).forEach(function (item) {
            var sub={};
            if(item.substr(-7)=="confirm"){
                if(data[item.substr(0,item.length-7)]==data[item]){
                    sub={res:"success",err:"",ptr:item};
                }else{
                    sub={res:"fail",err:"Does not match",ptr:item};
                }
                errs.push(sub);
            }else{
                var temp  = superSch[item][1].validator;
                if(temp==undefined){
                }else{
                    sub = validator[temp](data[item]);
                    sub.ptr=item;
                    errs.push(sub);
                }

            }
        });
        for(var i =0;i<errs.length;i++){
            if(errs[i].res=="fail"){
                err.res="fail";
                err.err.push({err:errs[i].err,ptr:errs[i].ptr});
            }
        }
        return err;
    },
    schemaGen:function(model,superS,set){
        var sch ={};
        for (var i in superS) {
            sch[i] = superS[i][0];
        }
        superSets[model]=set;
        superSchemas[model]=superS;
        return sch;
    },
    useCsrf:function () {
        useCsrf=true;
    },
    csrf:function (token) {
        csrfToken=token;
    },
    setEditData:function (data) {
        editData = data;
        console.log(data);
    }

};