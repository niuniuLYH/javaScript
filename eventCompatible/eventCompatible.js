var EventUtil = {
    addHandle:function(element,type,handle){//��Ԫ������¼��������
        if(element.addEventListener){
            element.addEventListener(type,handle,false);//falseΪ���¼�ð��ʱ����
        }else if(element.attachEvent){
            element.attachEvent('on' + type,handle);//����ie9������
        }else {
            element['on' + type] = handle;//����ie8�����µ������
        }
    },
    removeHandle:function(element,type,handle){//�Ƴ�Ԫ�ص�ʱ�䴦�����
        if(element.removeEventListener){
            element.removeEventListener(type,handle,false);
        }else if(element.detachEvent){
            element.detachEvent('on' + type,handle);
        }else{
            element['on' + type] = null;
        }
    },
    getEvent:function(event){
        return event ? event:window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation : function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    getRelatedTarget: function(event){//��ȡʱ������Ԫ�ء�ֻ��mouseover��mouseout��event������и�����
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){//ie�����mouseout�¼�����ʱ��������Ԫ��
            return event.toElement;
        }else if(event.fromElement){//ie�����mouseover�¼�����ʱ��������Ԫ��
            return event.formElement;
        }else{//�����¼��޸�����
            return null;
        }
    },
    getButton:function(event){//ȡ�õ���¼������İ�ť��š�
        if(document.implementation.hasFeature('MouseEvents','2.0')){//���������Ƿ�֧��DOM������¼�.(DOM���ֻ������ֵ��0,1��2)
            return event.button;
        }else{//����ie8�����µ�����¼���button���ԣ������кܶ಻��Ҫ��ֵ��������DOM��Ϊ��׼����һ������
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    getWheelDelta:function(event){//���������¼�����ʱ����ȡwheelDelta��ֵ��
        if(event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        }else {
            return -event.detail * 40;//����Firefox
        }

    },
    getCharCode: function(event){//�������¼�����ʱ��event������һ�����ԣ����ذ��µ��Ǹ����������ַ���ASCII����
        if(typeof event.charCode == 'number'){
            return event.charCode;
        }else{
            return event.keyCode;//����ie8�����º�Opera�����
        }
    }
}