import { Table123Service } from '../table123.service';
import { Table123Base} from '../table123.base.model';
import { Directive, EventEmitter, Input, Output, SecurityContext, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppUtilBaseService } from '@baseapp/app-util.base.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ChangeLogsComponent } from '@baseapp/widgets/change-logs/change-logs.component'
import { Table123ApiConstants } from '@baseapp/table123/table123/table123.api-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationPopupComponent } from '@baseapp/widgets/confirmation/confirmation-popup.component';
import { FormControl, FormGroup, Validators, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { debounceTime, fromEvent, distinctUntilChanged, of, Observer, Subscription, map, Observable, Subject } from 'rxjs';
import { environment } from '@env/environment';
import { allowedValuesValidator } from '@baseapp/widgets/validators/allowedValuesValidator';
import { dateValidator } from '@baseapp/widgets/validators/dateValidator';
import { ActionItem } from '@baseapp/widgets/action-bar/action-bar.component';
import { AppConstants } from '@app/app-constants';
import { AppGlobalService } from '@baseapp/app-global.service';
import { AppBaseService } from '@baseapp/app.base.service';
import { WorkflowSimulatorComponent } from '@baseapp/widgets/workflow-simulator/workflow-simulator.component';
import { BreadcrumbService } from '@baseapp/widgets/breadcrumb/breadcrumb.service';
import { UploaderService } from '@baseapp/upload-attachment.service';
import { BaseAppConstants } from '@baseapp/app-constants.base';
import { WorkflowHistoryComponent } from '@baseapp/widgets/workflow-history/workflow-history.component';
import { minValueValidator, maxValueValidator, validateNumber, ValidateDouble, minLengthValidator, validatePattern, maxLengthValidator } from '@baseapp/widgets/validators/customValidators';

@Directive(
{
	providers:[MessageService, ConfirmationService, DialogService]
}
)
export class Table123DetailBaseComponent{
	
	
	bsModalRef?: BsModalRef;
	isSearchFocused:boolean = false;
showBreadcrumb = AppConstants.showBreadcrumb;
	id: any;
pid:any;
isMobile: boolean = AppConstants.isMobile;  
errorfields: any = {};           
backupData:any = {};
hiddenFields:any = {};
data:any = {};
formErrors:any = {};
inValidFields:any = {};
formFieldConfig:any = {};
securityJson:any = {
}
formConfig = {};     
actionButtons:ActionItem[] = [];  
wizardItems:any = [];
currentUserData:any;
selectedItems:any ={};
workflowType = "";
workFlowEnabled = false;
workFlowInitialState = "";
workFlowField = "";
workflowActions:any ={
    disableActions:[],
    enableActions:[],
    hideActions:[]
  };
  isFormValueChanged: boolean = false;
  mandatoryFields:any ={};
  validatorsRetained:any ={};
  isSaveResponseReceived:boolean = false;
  formSecurityConfig:any = {};
  enableReadOnly = AppConstants.enableReadOnly;
 showScrollSpy = AppConstants.showScrollSpy;
isRowSelected:boolean = true; 
isPrototype = environment.prototype;
isList = false;
detailPageIgnoreFields:any=[];
autoSuggestPageNo:number = 0;
complexAutoSuggestPageNo:number = 0
  fieldEditMode: any = {};
conditionalActions:any ={
  disableActions:[],
  hideActions:[]
}
actionBarConfig:any =[];
dateFormat: string = AppConstants.calDateFormat;
subscriptions: Subscription[] = [];
activeTabIndexes: any = {};
 showWorkflowSimulator:boolean = false;
roles:any ={};
timeFormatPrimeNG: string = AppConstants.timeFormatPrimeNG;
dateFormatPrimeNG: string = AppConstants.dateFormatPrimeNG ;
minFraction = AppConstants.minFraction;
maxFraction = AppConstants.maxFraction;
currency = AppConstants.currency;
currencyDisplay = AppConstants.currencyDisplay;
defaultLocale: string = AppConstants.defaultLocale; 
calculationError:any ={};
public validators:any ={};
public errorMessages:any = {};
	comments: string ='';
confirmationReference:any;
	isChildPage:boolean = false;

	
	leftActionBarConfig : any = {
  "children" : [ {
    "outline" : "true",
    "buttonType" : "icon_on_left",
    "visibility" : "show",
    "showOn" : "both",
    "buttonStyle" : "curved",
    "icon" : {
      "type" : "icon",
      "icon" : {
        "label" : "fas fa-arrow-left",
        "value" : "fas fa-arrow-left"
      }
    },
    "action" : "back",
    "buttonEnabled" : "yes",
    "label" : "BACK",
    "type" : "button"
  }, {
    "outline" : "true",
    "label" : "BUTTON_GROUP",
    "type" : "buttonGroup",
    "children" : [ {
      "outline" : "true",
      "buttonType" : "icon_on_left",
      "visibility" : "show",
      "showOn" : "both",
      "buttonStyle" : "curved",
      "buttonEnabled" : "yes",
      "action" : "save",
      "conditionForButtonEnable" : "",
      "label" : "SAVE",
      "visiblity" : "show",
      "type" : "button"
    }, {
      "outline" : "true",
      "buttonType" : "icon_on_left",
      "visibility" : "show",
      "showOn" : "both",
      "buttonStyle" : "curved",
      "buttonEnabled" : "yes",
      "action" : "cancel",
      "conditionForButtonEnable" : "",
      "label" : "CANCEL",
      "visiblity" : "show",
      "type" : "button"
    }, {
      "outline" : "true",
      "buttonType" : "icon_on_left",
      "visibility" : "show",
      "showOn" : "both",
      "buttonStyle" : "curved",
      "buttonEnabled" : "yes",
      "action" : "changelog",
      "conditionForButtonEnable" : "",
      "label" : "CHANGELOG",
      "visiblity" : "show",
      "type" : "button"
    } ],
    "displayCount" : 2,
    "buttonStyle" : "curved"
  } ]
}
	workflowActionBarConfig : any = {
  "children" : [ {
    "outline" : true,
    "label" : "BUTTON_GROUP",
    "type" : "buttonGroup",
    "children" : [ ],
    "buttonStyle" : "curved",
    "displayCount" : 2
  } ],
  "label" : "Workflow Action Bar",
  "type" : "workflowActionBar"
}
	detailCaptionBarConfig : any = {
  "children" : [ ]
}
	detailFormStructureConfig : any = {
  "children" : [ ]
}
	detailFormConfig : any = {
  "children" : [ {
    "data" : "",
    "field" : "field1",
    "label" : "FIELD1",
    "mandatory" : "no",
    "transient" : false,
    "allowEditing" : "yes",
    "allowViewing" : "yes",
    "multipleValues" : false,
    "fieldId" : "field1",
    "fieldType" : "string",
    "uiType" : "text",
    "name" : "field1",
    "type" : "formField",
    "isPrimaryKey" : false,
    "fieldName" : "field1"
  } ],
  "columns" : "1",
  "type" : "form"
}
	pageViewTitle: string = 'TABLE123_DETAIL';
	
		detailFormControls : UntypedFormGroup = new UntypedFormGroup({
	field1: new UntypedFormControl('',[]),
});


	public table123Service = inject(Table123Service);
public appUtilBaseService = inject(AppUtilBaseService);
public translateService = inject(TranslateService);
public messageService = inject(MessageService);
public confirmationService = inject(ConfirmationService);
public dialogService = inject(DialogService);
public domSanitizer = inject(DomSanitizer);
public bsModalService = inject(BsModalService);
public activatedRoute = inject(ActivatedRoute);
public breadcrumbService = inject(BreadcrumbService);
public appBaseService = inject(AppBaseService);
public router = inject(Router);
public appGlobalService = inject(AppGlobalService);
public uploaderService = inject(UploaderService);
public location = inject(Location);
	

	
	workflowActionBarAction(btn: any) {
    if(!btn.wfAction) {
      if(btn.action)
        this.actionBarAction(btn);
      return;
    }
    const methodName: any = (`onwf` + btn.wfAction.charAt(0).toUpperCase() + btn.wfAction.slice(1));
    let action: Exclude<keyof Table123DetailBaseComponent, ' '> = methodName;
    const finalArr: string[] = [];
    this.formErrors = {};
    this.inValidFields = {};
    this.mandatoryFields = this.formSecurityConfig?.mandatoryfields?.hasOwnProperty(btn.wfAction) ? this.formSecurityConfig.mandatoryfields[btn.wfAction] : {}
    if (Object.keys(this.mandatoryFields).length > 0)
      this.addValidations(this.mandatoryFields);

    if (!this.appUtilBaseService.validateNestedForms(this.detailFormControls, this.formErrors, finalArr, this.inValidFields,this.formFieldConfig)) {
      if (finalArr.length) {
        this.showMessage({ severity: 'error', summary: 'Error', detail: this.appUtilBaseService.createNotificationList(finalArr), sticky: true });
        if (Object.keys(this.mandatoryFields).length > 0)
          this.clearValidations(this.mandatoryFields);
      }
    }
  else {
      if (typeof this[action] === "function") {
         const actionLabel = this.translateService.instant(btn.label);
        this.confirmationReference= this.dialogService.open(ConfirmationPopupComponent, {
          header: 'Confirmation',
          width: '30%',
          contentStyle: { "max-height": "500px", "overflow": "auto" },
          styleClass: "confirm-popup-container",
          data: {
            confirmationMsg: `Do you want to ${btn.actionLabel} the record ?`,
            isRequired: this.formSecurityConfig.comments?.hasOwnProperty(btn.wfAction) && this.formSecurityConfig.comments[btn.wfAction],
            action:btn.label
          }
        });

        this.confirmationReference.onClose.subscribe((result: any) => {
          if (Object.keys(this.mandatoryFields).length > 0)
            this.clearValidations(this.mandatoryFields);
          if (result?.accepted) {
            this.comments = result.comments;
           if(!(this.appUtilBaseService.isEqualIgnoreCase(this.detailFormControls.getRawValue(), this.backupData, this.appUtilBaseService.getIgnorableFields(this.detailFormControls.getRawValue(), this.backupData, this.detailPageIgnoreFields), true))) {
              this.isSaveResponseReceived = false;
              const isToastNotNeeded = true;
              this.onSave(isToastNotNeeded);
              let checkResponse = setInterval(() => {
                if (this.isSaveResponseReceived) {
                  this[action]();
                  clearInterval(checkResponse);
                }
              }, 1000);
            }
            else {
              this[action]();
            }
          }
        });
      }
    }
  }
addValidations(mandatoryFields:[]){
    mandatoryFields.forEach((controlName:string)=>{
      if(this.detailFormControls.controls[controlName].hasValidator(Validators.required)){
        if(!(this.validatorsRetained.hasOwnProperty(controlName))){
          this.validatorsRetained[controlName]= {}
        }
        this.validatorsRetained[controlName]['requiredValidator'] = true;
      }
      else{
        this.detailFormControls.controls[controlName].addValidators([Validators.required]);
        this.detailFormControls.controls[controlName].updateValueAndValidity({emitEvent:false});
      }
     })
  }
	getDisabled(formControl: any, ele: string) {
  const parent = ele.split('?.')[0];
  if (formControl.controls[parent] instanceof FormGroup){
    return formControl.get(ele)?.disabled
  }
  else
    return formControl.controls[parent].disabled;
}
	tabErrorCount(aftersave:boolean){ 
    const tabViews = this.tabviewValidation(this.detailFormStructureConfig ,[], 'tabView');
    const tabviewStructue = this.tabValidation(tabViews, [],'tab');
    tabviewStructue.forEach((parentele:any) => {
          parentele.tabIndex.map((ele:any,index:number)=>{
          const tabID =  ele+"_id"
          const tabLabelID =  ele+"_label_id"
          let er = (<HTMLInputElement>document.getElementById(tabID)).querySelectorAll(".error");
          if(er.length>0 && this.activeTabIndexes[parentele.tabName] !=index && !aftersave){
              document.getElementById(tabLabelID)?.classList.add("taberror");
              this.errorfields[ele] = true;
          }
          else{
            document.getElementById('tabIDS')?.classList.remove("taberror")
            this.errorfields[ele] = false;
          } 
        })
      });
  }
	getData(){
  if (environment.prototype && this.id) {
         const params = {
      sid: this.id
    };
    this.table123Service.getProtoTypingDataById(params).subscribe((res: any) => {
      res = JSON.parse(JSON.stringify(res))
    for (let key in res) {
        if (this.formFieldConfig[key]?.fieldType =="Date") {
            res[key] = new Date(res[key]);
        }
      }
      this.data = res;
      this.backupData = res;
      this.detailFormControls.patchValue(this.backupData);
    });
  } else if (this.id) {
    const params = {
      sid: this.id
    };
    const dataSubscription = this.table123Service.getById (params).subscribe((res: Table123Base[]) => {
      this.data = res || {};
      this.formatRawData();
    });
    this.subscriptions.push(dataSubscription);
  }
  else {
    this.setDefaultValues();
    this.backupData = this.appUtilBaseService.deepClone(this.detailFormControls.getRawValue());
  }
}
	getTabIndex(tabName:string){
    return 0;
  }
	canDeactivate(): Observable<boolean> | boolean {
    
     if(this.appUtilBaseService.isEqualIgnoreCase(this.detailFormControls.getRawValue(), this.backupData,this.appUtilBaseService.getIgnorableFields(this.detailFormControls.getRawValue(),this.backupData,this.detailPageIgnoreFields),true)){
       return true;
     }
    else{
      return Observable.create((observer: Observer<boolean>) => {
        this.confirmationService.confirm({
          message: this.translateService.instant('DISCARD_UNSAVED_CHANGES'),
          header: 'Confirmation',
          icon: 'pi pi-info-circle',
          accept: () => {
            observer.next(true);
            observer.complete();
          },
          reject: () => {
            observer.complete();
          },
        });
      });
    }
  }
	formatFormDataBeforeSave() {
    let data = this.detailFormControls.getRawValue();
    for (const ele in this.formFieldConfig) {
      const ec = this.formFieldConfig[ele];
      if (ec.columns && !ec.multipleValues) {
        data[ec.name] = this.configureRequestData(data[ec.name], ec.columns, ec.name)
      }
      else if (ec.columns && ec.multipleValues && data[ec.name]) {
        data[ec.name]?.map((o: any,index:number) => {
          const tempData = this.configureRequestData(data[ec.name][index], ec.columns, ec.name,index);
          data[ec.name][index] = tempData;
        })
      }
    }
    data = this.configureRequestData(data,this.detailFormConfig.children);
    return data;
  }
	formatRawData() {
    this.denormalize(this.data);
        // since this.data cannot be directly used for patch value, doing a deep copy
        // Deep copy converts date into string, so copy is performed before formatting
    let patchData = JSON.parse(JSON.stringify(this.data));
    this.selectedItems = [];
    for (const e in this.formFieldConfig) {
      const ec = this.formFieldConfig[e];
      if (ec.columns && !ec.multipleValues && this.data[ec.name]) {
        for (const e1 in this.data[ec.name]) {
           const ec1 = ec[e1];
          if(this.data[ec.name]){
          this.data[ec.name][ec1.name] = this.bindData(this.data[ec.name][ec1.name], ec1,ec.name);
          patchData[ec.name][ec1.name] = this.bindData(patchData[ec.name][ec1.name], ec1,ec.name);
          }
        }
      }
      else if (ec.columns && ec.multipleValues && this.data[ec.name]) {
        this.data[ec.name]?.map((o: any, index: number) => {
          for (const e1 in o) {
            const ec1 = ec[e1];
            if (this.data[ec.name]) {
              this.data[ec.name][index][ec1.name] = this.bindData(this.data[ec.name][index][ec1.name], ec1,ec.name,index);
              patchData[ec.name][index][ec1.name] = this.bindData(patchData[ec.name][index][ec1.name], ec1,ec.name,index);
            }
          }
        })
      }
      else {
       if(!ec.columns && this.data[ec.name]){
          this.data[ec.name] = this.bindData(this.data[ec.name], ec);
                  patchData[ec.name] = this.bindData(patchData[ec.name], ec);
        }        
      }
    }
   
   
// const patchData = JSON.parse(JSON.stringify(this.data));
this.detailFormControls.patchValue(patchData,{ emitEvent: true});
this.backupData = this.appUtilBaseService.deepClone(this.detailFormControls.getRawValue());

  }
	bindData(data: any, ele: any,parentEle?:string,index?:number) {
    if (ele.fieldType == 'Date' && data) {
      const formattedDate = new Date(data)
      return formattedDate;
    }
    if (ele.uiType === 'autosuggest' && ele.multipleValues) {
      let arr: any[] = [];
      if (data && Array.isArray(data)) {
        data?.map((k: any) => {
          const eName = parentEle && (index != undefined && index >=0) ? `${parentEle}_${ele.name}_${index}`: parentEle ?`${parentEle}_${ele.name}`:ele.name;
          this.createAutoSuggestFields(eName);
          this.selectedItems[eName] = data
          const lookupData ={...k.value,sid:(k.id || k.sid)}
           arr.push(lookupData);
        })
        if (arr.length > 0) {
          return arr;
        }
      }
    }
    else if (ele.uiType === 'autosuggest' && !ele.multipleValues) {
      if (data && Object.keys(data).length > 0) {
        const eName = parentEle && (index != undefined && index >= 0) ? `${parentEle}_${ele.name}_${index}` : parentEle ? `${parentEle}_${ele.name}` : ele.name;
        this.createAutoSuggestFields(eName);
        this.selectedItems[eName].push(data);
        const lookupData ={...data.value,sid:(data.id|| data.sid)}
        const value = lookupData;
        return value;
      }
    }
else if(['imageCarousel', 'attachments'].includes(ele.uiType)){
      const responseFiles = this.appUtilBaseService.createImagePreviewURL(data);
      return responseFiles;
    }
    else {
      return data;
    }
  }
	checkValidations(): boolean {
    const finalArr: string[] = [];
    this.formErrors = {};
    this.inValidFields = {};
    if (!this.appUtilBaseService.validateNestedForms(this.detailFormControls, this.formErrors, finalArr, this.inValidFields,this.formFieldConfig)) {
      if (finalArr.length) {
       setTimeout(() => {
          this.tabErrorCount(false)
        }, 50);                                                                                                                                                                                                                                   this.showMessage({ severity: 'error', summary: 'Error', detail: this.appUtilBaseService.createNotificationList(finalArr), sticky: true });
      }
      return false;
    }
    if(this.detailFormConfig.children) {
      let multComp = this.detailFormConfig.children.filter((ele: any) => ele.multipleValues && ele.columns);
      if(multComp.length) {
        let mulFormErrors: string[] = [];
        multComp.forEach((config: any) => {
          let colnames = config.columns.filter((col: any) => col.name !== 'jid').map((col: any) => col.name);
          let values = this.detailFormControls.value[config.field];
          values = values.filter((row: any) => {
            return Object.keys(row) && Object.keys(row).find(key => colnames.includes(key));
          });
          this.detailFormControls.get(config.field)?.patchValue(values);
          mulFormErrors = [...mulFormErrors, ...this.appUtilBaseService.validateMultipleComp(this.detailFormControls.value, config)];          
        });
        if(mulFormErrors.length) {
          this.showMessage({ severity: 'error', summary: 'Error', detail: this.appUtilBaseService.createNotificationList(mulFormErrors), sticky: true });
          return false;
        }
      }
    }
    return true;
  }
	initFormValidations(){
    this.detailFormControls.enable({ emitEvent: false });
    this.hiddenFields = {};
    this.updateAllowedActions();
    this.formValueChanges();
    this.disableDependantFields();
  }

showMessage(config:any){
    this.messageService.clear();
    this.messageService.add(config);
}
	tabviewValidation(array: any, tabIndexes: any = {} , type:string) {
    array.children.map((o: any, index: number) => {
      if (o.type === type) {
        tabIndexes[o.tabName] =o;
      }
      if (o.children)
        this.tabviewValidation(o, tabIndexes,type);
    })
    return tabIndexes;
  }
	onMultiDataFractionCheck(item:any,config:any){
    if (config.uiType.toLowerCase() == 'number' && config.isDouble) {
      const dec = item.value.split('.')[1]
      const len = (dec && (dec.length > config.minFractionDigits) && (dec.length < config.maxFractionDigits)) ? dec.length :
        (dec && dec.length > config.maxFractionDigits) ? config.maxFractionDigits : config.minFractionDigits;
      let value = Number(item.value).toFixed(len);
      item.value = value;
      item.display = value;

    }
  }
	loadActionbar(){
    
}
	actionBarAction(btn: any) {
    const methodName: any = (`on` + btn.action.charAt(0).toUpperCase() + btn.action.slice(1));
    let action: Exclude<keyof Table123DetailBaseComponent, ' '> = methodName;
    if (btn.action === 'navigate_to_page' && btn.pageName?.url) {
      this.router.navigateByUrl(btn.pageName.url);
    }
    else if (typeof this[action] === "function") {
      this[action]();
    }
  }
	bindLookupFields(): void {
    const lookupArray: any = []
    for (const ele in this.formFieldConfig) {
      if (this.formFieldConfig[ele].uiType === 'autosuggest' && this.formFieldConfig[ele].filterOutputMapping) {
        this.detailFormControls.get(this.formFieldConfig[ele].fieldName)?.valueChanges.subscribe((obj) => {
          this.formFieldConfig[ele].filterOutputMapping.map((filter: any) => {
            if (this.formFieldConfig[ele].multipleValues && obj) {
              obj?.map((o: any) => {
                const filterValue = o.value? o.value[filter.lookupField]:o[filter.lookupField];
                lookupArray.push(filterValue);
              })
              this.detailFormControls?.get(filter.tableField)?.patchValue(lookupArray.toString());
            }
           else{
              if(obj){
                const filterValue = obj.value? obj.value[filter.lookupField]:obj[filter.lookupField];
                this.detailFormControls?.get(filter.tableField)?.patchValue(filterValue);
              }
              else{
                this.detailFormControls?.get(filter.tableField)?.reset();
              }
            }
          })
        })
      }
    }
  }
	tabValidation(array: any, tabIndexes: any = [] , type:string) {
    let modal:any ={
      tabName :'',
      tabIndex:[]
    }
    let key = Object.keys(array);
    key.map((tabkey:string)=>{
      modal['tabName'] = tabkey;
      array[tabkey].children.map((o: any, index: number) => {
        if (o.type === 'tab') {
         modal.tabIndex.push(o.tabName);
        }
        else{
        if (o.children)
          this.tabValidation(o, tabIndexes,type);
        }
      })
      tabIndexes.push({...modal});
      modal.tabIndex = [];
    })
     return tabIndexes;
   }
	normalize(data:any){
    return data;
  }
	leftPad(num:number, length:number) {
    var result = '' + num;
    while (result.length < length) {
      result = '0' + result;
    }
    return result;
  }
	waitForResponse() {
    if(environment.prototype){
      this.getWorkflowConfig();
    }
    else{
      setTimeout(() => {
        if (this.id && !environment.prototype) {
          if (!this.data?.workflowInfo) {
            this.waitForResponse();
          }
          else {
            this.getWorkflowConfig();
          }
        }
      }, 3000);
    }
  
  }
	initWorkflow() {
    if (this.workFlowInitialState && this.workFlowEnabled && this.workFlowField) {
      this.detailFormConfig?.children?.forEach((ele: any) => {
        if (ele?.field === this.workFlowField && ele?.multipleValues) {
          this.detailFormControls.get(this.workFlowField)?.patchValue([this.workFlowInitialState], { emitEvent: false });
          this.backupData[this.workFlowField] = [this.workFlowInitialState];
        }
        else {
          if (ele?.field === this.workFlowField && !ele?.multipleValues) {
            this.detailFormControls.get(this.workFlowField)?.patchValue(this.workFlowInitialState, { emitEvent: false });
            this.backupData[this.workFlowField] = this.workFlowInitialState;
          }
        }
      })
      this.activatedRoute.queryParams.subscribe((params: any) => {
        if (!environment.prototype && !params['id']) {
        const currentUserData= this.appGlobalService.getCurrentUserData();
          const state = this.workFlowInitialState ? this.workFlowInitialState.replace(/ /g, "_").toLowerCase() : '';
         const workflowInfo = { actors: currentUserData ? currentUserData?.userRoles : [], step: state }
          this.getWorkflowConfig(workflowInfo);
        }
      });
    }
  }
	createAutoSuggestFields(ele: any) {
    if (!this.selectedItems?.hasOwnProperty(ele)) {
      this.selectedItems[ele] = [];
    }

  }
	onWorkflowhistory() {
    const workflowHistory = this.dialogService.open(WorkflowHistoryComponent, {
      header: 'Workflow History',
      width: '60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      styleClass: "workflow-history",
      data: {
        id: this.id,
        workflowType: this.workflowType
      }
    });
  }
	updateActions(actionConfig:any){
    if(actionConfig.visibility === 'conditional' && actionConfig.conditionForButtonVisiblity){
      this.restrictEditandView(actionConfig.conditionForButtonVisiblity,'view',actionConfig.action,true);
    }
    if(actionConfig.buttonEnabled === 'conditional' && actionConfig.conditionForButtonEnable){
      this.restrictEditandView(actionConfig.conditionForButtonEnable,'edit',actionConfig.action,true);
    }
  }
	onUrlClick(event: any) {
      window.open(event.value, '_blank');
  }
	restrictEditandView(ele: any, action: string, fieldName: string, fromActionBar?: boolean) {
    const conResult = this.appUtilBaseService.evaluvateCondition(ele?.query?.rules, ele?.query?.condition,{...this.data,...this.detailFormControls.getRawValue()}, this.formFieldConfig);
    if (fromActionBar) {
      this.allocateActions(fieldName, conResult, action)
    } else {
      if (action == 'view') {
        this.hiddenFields[fieldName] = conResult ? false : true;
      }
      else if (action == 'edit') {
        conResult ? this.detailFormControls.get(fieldName)?.enable({ emitEvent: false }) :
          this.detailFormControls.get(fieldName)?.disable({ emitEvent: false });
      }
    }
  }
	onCancel(){
  this.messageService.clear();
  if (this.appUtilBaseService.isEqualIgnoreCase(this.backupData, this.detailFormControls.getRawValue(), this.appUtilBaseService.getIgnorableFields(this.detailFormControls.getRawValue(),this.backupData,this.detailPageIgnoreFields), true)) {
    this.showMessage({ severity: 'info', summary: '', detail: this.translateService.instant('NO_CHANGES_AVAILABLE_TO_CANCEL') });
  } else {
    this.confirmationService.confirm({
      message: this.translateService.instant('DISCARD_UNSAVED_CHANGES'),
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        const patchData = this.appUtilBaseService.deepClone(this.backupData)
        this.detailFormControls.patchValue(patchData,{ emitEvent: false });
      },
      reject: () => {
      },
    });
  }

}
	getId(){
      this.activatedRoute.queryParams.subscribe((params: any) => { 
        this.id = params['id'];
        this.pid = params['pid']
      }); 
    }
	getWorkflowConfig(workflowInfo?:any) {
    const workFlowInfo:any = (this.id)? this.data?.workflowInfo:workflowInfo;
    const params = {
      workflowType: this.workflowType
    }
    if(environment.prototype && this.workFlowEnabled){
      this.appBaseService.getPrototypingworkflow(this.workflowType).subscribe((res:any)=>{
        this.securityJson = res.config;
        this.configureFormOnWorkflow(workFlowInfo);
      })
    }
    else if (workFlowInfo && this.workFlowEnabled){
        this.appBaseService.getWorkFlowConfig(params).subscribe((res: any) => {
          this.securityJson = res.config;
          this.configureFormOnWorkflow(workFlowInfo);
        })
    }
  }
	onBack(){
	this.messageService.clear();
	if (this.appUtilBaseService.isEqualIgnoreCase(this.backupData, this.detailFormControls.getRawValue(), this.appUtilBaseService.getIgnorableFields(this.detailFormControls.getRawValue(),this.backupData,this.detailPageIgnoreFields), true)){			
     this.location.back();
	}else{
		this.confirmationService.confirm({
		    message:this.translateService.instant('DISCARD_UNSAVED_CHANGES'),
			header:'Confirmation',
			icon:'pipi-info-circle',
			accept:()=>{
              this.backupData = this.appUtilBaseService.deepClone(this.detailFormControls.getRawValue());				
              this.location.back();
			},
			reject:()=>{
			},
		});
	}
}
	formValueChanges() {
    this.detailFormControls.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
    )
      .subscribe(() => {
        this.updateAllowedActions();
        this.isFormValueChanged = true;
      })
  }
	checkUnsavedComplexFields():any {
    const newRows:any = []
    let hasUnSavedChanges:boolean = false;
    const data = this.detailFormControls.getRawValue();
    const fields:any =[];
    const complexTable = (Object.keys(this.formFieldConfig)).filter(key=> this.formFieldConfig[key].columns && this.formFieldConfig[key].multipleValues)
       if(complexTable.length> 0){ 
         complexTable.map((field)=>{
          data[field]?.map((e: any) => {
            if(e.isNewRow || this.fieldEditMode[field]){
              hasUnSavedChanges = true;
              fields.push(field);
            }
              newRows.push(e);
          })
         })
       }
       return {
        newRows:newRows,
        fields:[...new Set(fields)],
        hasUnSavedChanges:hasUnSavedChanges
      }
    }
	scrolltoTop() {
    const tracker = (<HTMLInputElement>document.getElementsByClassName('main-content')[0])
    let windowYOffsetObservable = fromEvent(tracker, 'scroll').pipe(map(() => {
      return Math.round(tracker.scrollTop);
    }));
    const headerHeight: any = $('#header-container').outerHeight(true);
    const titleBarheight: any = $('#title-bar').outerHeight(true);

    windowYOffsetObservable.subscribe((scrollPos: number) => {
      if (scrollPos >= titleBarheight) {
        $('.wizard-container .p-tieredmenu').animate({
          top: headerHeight, marginTop: '10px'
        }, 0);
      }
      else {
        $('.wizard-container .p-tieredmenu').animate({
          top: headerHeight + titleBarheight
        }, 0);
      }
    })
  }
	configureFormOnWorkflow(workflowDataForNewRec?:any) {
    const actions: any = this.workflowActionBarConfig?.children;
    let workflowInformation:any = {}
 if (this.id) {
workflowInformation.actors = this.data?.workflowInfo && this.data?.workflowInfo[this.workflowType]?.userTypes || [],
workflowInformation.step = this.data?.workflowInfo && this.data?.workflowInfo[this.workflowType]?.step || ''
}
else {
workflowInformation.actors = workflowDataForNewRec.actors || [];
workflowInformation.step = workflowDataForNewRec.step || '';
}
    this.formSecurityConfig = this.appUtilBaseService.getFormSecurityConfigFromSecurityJSON(this.securityJson, this.detailFormControls, actions, workflowInformation);
    console.log(this.formSecurityConfig)
    this.hiddenFields = this.formSecurityConfig.hidefields;

    for (const control in this.detailFormControls.getRawValue()) {
      if (this.formSecurityConfig.disableonlyfields.indexOf(control) > -1)
      // && !(this.formSecurityConfig.enableonlyfields.indexOf(control) > -1)) 
      {
        this.detailFormControls.controls[control].disable({ emitEvent: false });
      }
      if (this.formSecurityConfig.enableonlyfields.indexOf(control) > -1) {
        this.detailFormControls.controls[control].enable({ emitEvent: false });
      }
      if (this.formSecurityConfig.hidefields.indexOf(control) > -1 )
      // && !(this.formSecurityConfig.showfields.indexOf(control) > -1)) 
      {
        this.hiddenFields[control] = true;
      }
      if (this.formSecurityConfig.showfields.indexOf(control) > -1) {
        this.hiddenFields[control] = false;
      }
    }
    this.workflowActions = {
      disableActions: [...this.formSecurityConfig.disableonlyactions],
      enableActions: [...this.formSecurityConfig.enableonlyactions],
      hideActions: [...this.formSecurityConfig.hideactions],
      showActions: [...this.formSecurityConfig.showactions]
    }
  }
	addRequiredValidator(ele: any, fieldName: string) {
    const conResult = this.appUtilBaseService.evaluvateCondition(ele.query?.rules, ele.query?.condition, this.detailFormControls.getRawValue(), this.formFieldConfig);
    if (conResult) {
      this.detailFormControls.controls[fieldName].addValidators([Validators.required]);
    }
    else {
      this.detailFormControls.controls[fieldName].removeValidators([Validators.required]);
    }
    this.detailFormControls.controls[fieldName].updateValueAndValidity({ emitEvent: false });
    this.formFieldConfig[fieldName].isRequired = (conResult) ? true : false;
  }
	getValue(formControl: FormGroup, ele: string) {
    const parent = ele.split('?.')[0];
    if (formControl.controls[parent] instanceof FormGroup){
      const child = ele.split('?.')[1];
      return formControl.controls[parent].value[child];
    }
    else
      return formControl.controls[parent].value;
  }
	formatCaptionItems(config: any, data: any) {
    if (Object.keys(data).length > 0) {
      return (this.appUtilBaseService.formatRawDatatoRedableFormat(config, data[config.field]));
    }
    else {
      return '';
    }
  }
	enableChildOptions(){
	}
	updateAllowedActions() {
    for (const ele in this.formFieldConfig) {
      if (this.detailFormControls.controls[ele] instanceof FormGroup) {
        for (const childEle in this.formFieldConfig[ele])
          this.updateFields(this.formFieldConfig, ele, childEle);
      }
      else {
        this.updateFields(this.formFieldConfig, ele, '');
      }
    }

    this.actionBarConfig?.forEach((action:any)=>{
      this.updateActions(action);
    })
  }
	confirmationPopup(fields: []) : Observable<boolean>{
    return Observable.create((observer: Observer<boolean>) => {
      this.confirmationService.confirm({
        message: this.translateService.instant('COMPLEX_RECORD_SAVE_CONFIRMATION', { field: fields.toString() }),
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          fields.map((o) => $($(`.${o}_editSave-btn`)).trigger('click'));
           observer.next(true) 
           observer.complete();       
          },
        reject: () => {
          fields.map((o) => $($(`.${o}_editCancel-btn`)).trigger('click'));
          observer.next(true) 
           observer.complete(); 
        },
      });
    });
  }
	setDefaultValues() {
    for (const ele in this.formFieldConfig) {
      if (['Boolean'].includes(this.formFieldConfig[ele].fieldType)) {
        const defaultBooleanValues = this.formFieldConfig[ele].defaultVal ? this.formFieldConfig[ele].defaultVal : false;
        this.detailFormControls.controls[ele].patchValue(defaultBooleanValues, { emitEvent: true });
        this.backupData[ele] = defaultBooleanValues;
      } else if (this.formFieldConfig[ele].defaultVal && (this.formFieldConfig[ele].uiType === 'datetime' || this.formFieldConfig[ele].uiType === 'date')) {
        let defaultValue = (this.formFieldConfig[ele].defaultVal);
        if (typeof defaultValue == 'string') {
          if (defaultValue?.toLowerCase() == 'today') {
            defaultValue = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)).getTime()
          } else if (defaultValue?.toLowerCase() == 'tomorrow') {
            defaultValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1).getTime()
          } else if (defaultValue?.toLowerCase() == 'start_of_month') {
            defaultValue = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime()
          } else if (defaultValue?.toLowerCase() == 'end_of_month') {
            defaultValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime()
          }
        }
        const formattedDate = new Date(defaultValue)
        this.detailFormControls.controls[ele].patchValue(formattedDate, { emitEvent: true });
        this.backupData[ele] = formattedDate;
      } else if (this.formFieldConfig[ele].defaultVal && (this.formFieldConfig[ele].uiType === 'select' || this.formFieldConfig[ele].uiType === 'checkboxgroup' || this.formFieldConfig[ele].uiType === 'radio')) {
        let defaultValue: any = (this.formFieldConfig[ele].defaultVal);
        let defaultLabel: any;
        if (typeof defaultValue == 'string') {
          defaultLabel = (defaultValue?.trim()?.replace(/ /g, "_"))?.toUpperCase()
        } else if (Array.isArray(defaultValue)) {
          defaultValue?.forEach((obj: any, index: any, a: any) => {
            a[index] = (obj?.trim()?.replace(/ /g, "_"))?.toUpperCase();
          })
          defaultLabel = defaultValue
        } else {
          defaultLabel = defaultValue
        }
        if (this.formFieldConfig[ele].multiple || this.formFieldConfig[ele].uiType === 'checkboxgroup' || Array.isArray(defaultValue)) {
          this.detailFormControls.controls[ele].patchValue(defaultLabel, { emitEvent: true });
          this.backupData[ele] = Object.assign([], defaultLabel);
        } else {
          this.detailFormControls.controls[ele].patchValue(defaultLabel, { emitEvent: true });
          this.backupData[ele] = defaultLabel;
        }
      } else if (this.formFieldConfig[ele].defaultVal) {
        const defaultValue = (this.formFieldConfig[ele].defaultVal);
        this.detailFormControls.controls[ele].patchValue(defaultValue, { emitEvent: true });
        this.backupData[ele] = defaultValue;
      }
    }
  }
	loadCaptionbarItems(){
    
}
	generateRequestObj(data: any) {
    const props = Object.keys(data);
    let requestedObj: any = {};
    props.forEach((o: any) => {
      if (this.detailFormControls.controls[o] instanceof FormGroup && !this.formFieldConfig[o].multiple) {
        data[o] = this.configureEmptyValuestoNull(data[o])
      }
      else if (this.detailFormControls.controls[o] instanceof FormGroup && this.formFieldConfig[o].multiple) {
        data[o].map((k: any, index: number) => { data[o][index] = this.configureEmptyValuestoNull(data[o][index]) })
      }
    })
    requestedObj = this.configureEmptyValuestoNull(data);
    return requestedObj;
  }
	reloadForm(workflowInfo: any) {
    this.data.workflowInfo ={
          [this.workflowType]:workflowInfo
        };
  
const wfData ={
actors:workflowInfo.userTypes,
step:workflowInfo.step
}
       const methodName: any = "configureFormOnWorkflow";
        let action: Exclude<keyof Table123DetailBaseComponent, ' '> = methodName;
        if (typeof this[action] === "function") {
          this[action](wfData);
          this.updateAllowedActions();
          this.formValueChanges();
        }
  }
	updateFields(formFieldConfig: any, ele: string, childEle: string) {
    const fieldConfig = (childEle) ? formFieldConfig[ele][childEle] : formFieldConfig[ele];

    if (fieldConfig.allowViewing === 'no') {
      if (childEle){
        if(!this.hiddenFields[this.formFieldConfig[ele].name])
          this.hiddenFields[this.formFieldConfig[ele].name] ={};
      this.hiddenFields[this.formFieldConfig[ele].name][fieldConfig.name] = true;
      }
      else
        this.hiddenFields[this.formFieldConfig[ele].name] = true;
    }
    else if (fieldConfig.viewConditionally && fieldConfig.allowViewing === 'conditional') {
      this.restrictEditandView(fieldConfig.viewConditionally, 'view', fieldConfig.name)
    }
    if (fieldConfig.allowEditing === 'no') {
      if (childEle)
        this.detailFormControls.get(`${[this.formFieldConfig[ele].name]}.${fieldConfig.name}`)?.disable({ emitEvent: false });
      else
        this.detailFormControls.get(fieldConfig.name)?.disable({ emitEvent: false });
    }
    else if (this.formFieldConfig[ele].editConditionally && this.formFieldConfig[ele].allowEditing === 'conditional') {
      this.restrictEditandView(fieldConfig.editConditionally, 'edit', fieldConfig.name)
    }
    if (this.formFieldConfig[ele].mandatory === 'conditional' && this.formFieldConfig[ele].conditionalMandatory) {
      this.addRequiredValidator(fieldConfig.conditionalMandatory, fieldConfig.name);
    }
  }
	allocateActions(label: string, result: boolean, action: string) {
    if (action === 'view') {
      if (result && this.conditionalActions.hideActions.includes(label))
        this.conditionalActions.hideActions?.splice(this.conditionalActions.hideActions?.indexOf(label), 1)
      else if (!result && !this.conditionalActions.hideActions.includes(label))
        this.conditionalActions.hideActions.push(label);
    }
    else if (action === 'edit') {
      if (result && this.conditionalActions.disableActions.includes(label))
        this.conditionalActions.disableActions.splice(this.conditionalActions.disableActions?.indexOf(label), 1);
      else if (!result && !this.conditionalActions.disableActions.includes(label))
        this.conditionalActions.disableActions.push(label);
    }
  }
	denormalize(backupData: any) {
}
	configureRequestData(data: any, ele: any, parentEle?:string,index?:number) {
if (Array.isArray(ele)) {
    ele.map((ele: any) => {
     if (ele.fieldType == 'Date' && data[ele.name]) {
          const formattedDate = new Date(data[ele.name]).getTime()
          if (ele.uiType == 'date') {
            const tempDate = new Date(data[ele.name]);
            const convertedDate = tempDate.getFullYear() + '-' + this.leftPad((tempDate.getMonth() + 1), 2) + '-' + this.leftPad(tempDate.getDate(), 2);
            data[ele.name] = convertedDate;
          }
          else {
            data[ele.name] = formattedDate;
          }
        }
      else if (ele.fieldType === 'Boolean') {
        if (data[ele.name] === null || data[ele.name] === undefined || data[ele.name] === '') {
          data[ele.name] = false;
        }
      }          
      if(ele.uiType == 'autosuggest' && !(Array.isArray(data[ele.name]) || typeof data[ele.name] === 'object')) {
        data[ele.name] = null;
      }
    })
   }
    if (Object.keys(this.selectedItems).length > 0) {
      const keys = Object.keys(this.selectedItems);
      keys?.forEach((k) => {
        const e = parentEle? k.split('_')[1]:k;
       if(parentEle && (index != undefined && index >=0)) {
          const keyarr = k.split('_');
        
          if (data.hasOwnProperty(e) && parentEle === keyarr[0] && index.toString() == keyarr[2]) {
            data[e] = this.selectedItems[k];
          }
        } 
        else if(parentEle){
          if (data.hasOwnProperty(e) && parentEle === k.split('_')[0]) {
            data[e] = this.selectedItems[k];
          }
        }
        else {
          if (data.hasOwnProperty(e) ) {
            data[e] = this.selectedItems[k];
          }
        }
      });
      ele.map((ele: any) => {
      if (ele.uiType == 'autosuggest' && data[ele.name] && !ele.multipleValues) {
          data[ele.name] = (Array.isArray(data[ele.name]) && data[ele.name].length > 0) ? data[ele.name][0] :(Array.isArray(data[ele.name]) && data[ele.name].length <=0)? null: data[ele.name];
        }
      })
    }
    return data;
  }
	configureEmptyValuestoNull(data:any){
       const value =  Object.keys(data).reduce((acc:any, key:string) => {acc[key] = data[key] === '' ||(Array.isArray(data[key]) && data[key].length == 0)? null : 
    data[key]; return acc; }, {})
    return value;
  }
	editFormula(config:any,fieldname:any){
     const fieldConfig = config[fieldname]
     if(fieldConfig.formulaMethod){
       let methodName: Exclude<keyof Table123DetailBaseComponent, ' '> = fieldConfig.formulaMethod
         if(typeof this[methodName] ==="function")
          this[methodName](this.detailFormControls.getRawValue());
     }
   }
	clearValidations(mandatoryFields: []) {
    mandatoryFields.forEach((controlName: string) => {
      if (!(this.validatorsRetained[controlName] && this.validatorsRetained[controlName]['requiredValidator'])) {
        this.detailFormControls.controls[controlName].removeValidators(Validators.required);
        this.detailFormControls.controls[controlName].updateValueAndValidity({emitEvent:false});
      }

    })
  }
	disableDependantFields() {
    let hasUnfilledValues:boolean = false;
    const detailFormControls = this.detailFormControls.getRawValue()
    for (const ele in this.formFieldConfig) {
      if (this.formFieldConfig[ele].uiType === 'autosuggest' && this.formFieldConfig[ele].mandatoryFilters) {
        this.formFieldConfig[ele].filterInputMapping?.map((filter: { lookupField: string,tableField:string }) => {
          const fieldName = filter.tableField.split('.')[0];
          if (this.formFieldConfig[ele].mandatoryFilters.includes(filter.lookupField) && (detailFormControls[fieldName] === null || detailFormControls[fieldName]=== undefined || detailFormControls[fieldName] === '')){
            hasUnfilledValues = true;
          }
        })
        hasUnfilledValues?this.detailFormControls.get(this.formFieldConfig[ele].fieldName)?.disable({ emitEvent: false }):
        this.detailFormControls.get(this.formFieldConfig[ele].fieldName)?.enable({ emitEvent: false });
      }
    }
  }
	openWorkflowSimilator() {
    const ref = this.dialogService.open(WorkflowSimulatorComponent, {
      header: 'Workflow Simulator',
      width: '350px',
      data: {
        statusFieldConfig: this.formFieldConfig[this.workFlowField],
        actorFieldConfig: Object.values(this.roles)?.map((actor)=> {return{label:actor,value:actor}}),
        selectedValues: (this.data?.workflowInfo)? this.data?.workflowInfo[this.workflowType]:{userTypes:[],step:''}
      }
    });
    ref.onClose.subscribe((workflowInfo: any) => {
      if (workflowInfo) {
        this.reloadForm(workflowInfo);
      }
    });
  }
	addValidatorsForMultiValues() {
    for (const property in this.formFieldConfig) {
      if (this.formFieldConfig[property].multipleValues && (this.formFieldConfig[property].uiType == 'number')) {
        if(this.formFieldConfig[property].isDouble){
          this.validators[property] = [ValidateDouble,minValueValidator(this.formFieldConfig[property]),maxValueValidator(this.formFieldConfig[property]),validatePattern(this.formFieldConfig[property])];
        }
        else{
          this.validators[property] = [validateNumber, minValueValidator(this.formFieldConfig[property]), maxValueValidator(this.formFieldConfig[property]),validatePattern(this.formFieldConfig[property])]
        }
      }
      else if (this.formFieldConfig[property].multipleValues && this.formFieldConfig[property].uiType == 'string') {
        this.validators[property] = [minLengthValidator(this.formFieldConfig[property]), maxLengthValidator(this.formFieldConfig[property])]
      }
      else if (this.formFieldConfig[property].multipleValues && this.formFieldConfig[property].uiType == 'currency') {
        this.validators[property] = [ValidateDouble, minValueValidator(this.formFieldConfig[property]), maxValueValidator(this.formFieldConfig[property])]
      }
    }
this.errorMessages = {
      'minValue': this.translateService.instant('MIN_VALUE'),
      'maxValue': this.translateService.instant('MAX_VALUE'),
      'minLength': this.translateService.instant('MIN_LENGTH'),
      'maxLength': this.translateService.instant('MAX_LENGTH'),
      'invalid': this.translateService.instant('INVALID'),
      'pattern': this.translateService.instant('PATTERN'),
    }
  }
	calculateFormula(){
	
}
	onSave(isToastNotNeeded ?: boolean) {
  if (this.appUtilBaseService.isEqualIgnoreCase(this.detailFormControls.getRawValue(), this.backupData, this.appUtilBaseService.getIgnorableFields(this.detailFormControls.getRawValue(), this.backupData, this.detailPageIgnoreFields), true)) {
    this.showMessage({ severity: 'info', summary: '', detail: this.translateService.instant('NO_CHANGES_AVAILABLE_TO_SAVE') });
    return;
  }
  if (this.checkValidations()) {
    const complexData = this.checkUnsavedComplexFields();
    if (complexData.hasUnSavedChanges) {
    
      complexData.fields.map((o: any) => $($('.'+o+'_editSave-btn')).trigger('click'));
    }
    let preFormattedData = this.formatFormDataBeforeSave();
    let data = this.normalize(preFormattedData)
    const method = this.id ? 'update' : 'create';
    data = { ...this.backupData, ...data };
    if (this.pid) {
      data.pid = this.pid;
    }
    if (this.id) {
      data.sid = this.id
    }

  const requestedObj = this.generateRequestObj(data);
      this.messageService.clear();
      const attachmentTypes = ['imageCarousel', 'attachments'];
      const attachmentFields = this.detailFormConfig?.children
        .filter((ele: any) => attachmentTypes.includes(ele.uiType))
        .map((item: any) => item.fieldName);
      const splittedData = this.appUtilBaseService.splitFileAndData(data, attachmentFields);

      if (Object.keys(splittedData.files).length > 0) {
      
      const saveSubscription = this.uploadAttachmentsandSaveData(requestedObj, splittedData).subscribe(res => {
          this.onAfterSave(res, data, method, isToastNotNeeded);
        }, err => { this.isSaveResponseReceived = true })
        this.subscriptions.push(saveSubscription);
      }
      else {
        const saveSubscription = this.table123Service[method](requestedObj).subscribe((res:Table123Base) => {
          this.onAfterSave(res, data, method, isToastNotNeeded);
        })
        this.subscriptions.push(saveSubscription);
      }
    }

  }
     
       onAfterSave(res: any, data: any, method: string, isToastNotNeeded?: boolean) {
    this.data = { ...data, ...res };
    this.formatRawData();
    this.isSaveResponseReceived = true;
    this.isFormValueChanged = false;
    this.id = res.sid;
    if (method === 'create') {
      this.router.navigate(
        [],
        {
          queryParams: { id: this.id },
          relativeTo: this.activatedRoute,
          queryParamsHandling: 'merge',
          replaceUrl: true
        }).then(() => { this.onInit() });
        this.enableChildOptions();
    }
    if (!isToastNotNeeded) {
      this.showMessage({ severity: 'success', summary: '', detail: this.translateService.instant('RECORD_SAVED_SUCCESSFULLY') });
    }
  }

uploadAttachmentsandSaveData(data: any, splittedData: any): Observable<any> {
    const subject$ = new Subject();

    const completeReq = (resData: any,) => {
      resData ? subject$.next(resData) : subject$.error(resData);
      subject$.complete();
    }
    if (!this.id) {
       const saveSubscription =  this.table123Service.create(splittedData.data).subscribe(
        createdData => {
          const data = { ...splittedData.data, ...createdData };
          splittedData.data = data;
          this.id = data.sid;
          if (splittedData.files) {
            this.updateData(splittedData).subscribe(
              updatedData => completeReq(updatedData),
              err => completeReq(null)
            );
          }
        },
        err => completeReq(null))
        this.subscriptions.push(saveSubscription);
    } else {
      const saveSubscription =  this.updateData(splittedData).subscribe(
        updatedOrg => completeReq(updatedOrg),
        err => completeReq(null)
      );
      this.subscriptions.push(saveSubscription);
    }

    return subject$.asObservable()
  }

updateData(splittedData:any){
const subject$ = new Subject();
const updateSubscription =  this.saveFiles(splittedData).subscribe((dataToUpdate:any)=>{
  dataToUpdate.data.sid = this.id;
  this.table123Service.update(dataToUpdate.data).subscribe(
   res => {
     subject$.next(res);
     subject$.complete();
   },
   err =>{
     subject$.error(null);
     subject$.complete();
   }
 )
});
this.subscriptions.push(updateSubscription);
return subject$.asObservable()
}

saveFiles(splittedData: any) {
    if (splittedData.files && Object.values(splittedData.files).filter(item => item).length) {
      return new Observable(observer => {
        this.uploaderService.saveAddedFiles(splittedData, this.id, this.detailFormControls).subscribe((res: any) => {
          let fData: any = {};
          for (const key in res.dataToResend) {
            if (res.dataToResend[key] instanceof Array) {
              const tempArr = res.dataToResend[key].flat();
              fData[key] = (tempArr.filter((n: any, i: any) => tempArr.indexOf(n) === i)).filter(Boolean);
            } else {
              fData[key] = [res.dataToResend[key]];
            }
            fData[key]= this.appUtilBaseService.removeImagePreviewProperties(fData[key]);
          }
          
          const finalData = { data: { ...splittedData.data, ...fData } };
          if (res.error) {
            let errResponse = res.error;
            const errorArr: any = [];
            Object.keys(res.error).forEach((key) => {
              if (errResponse && errResponse[key]?.error?.MESSAGE) {
                errorArr.push(errResponse[key]?.error?.MESSAGE);
              } else {
                errorArr.push("Failed to upload " + key);
              }
            })
            if(errorArr.length > 0)
            this.showMessage({ severity: 'error', summary: 'Error', detail: this.appUtilBaseService.createNotificationList(errorArr) });
          }
          observer.next(finalData);
          observer.complete();
        }, (err: any) => {
          observer.error(err);
        });
      });
    } else {
      return of(splittedData)
    }
  }
	getUserRoles(){
      this.appBaseService.getRoles().subscribe((res:any)=>this.roles = res ||{});
   }
	checkColumnProperty(fieldName: string, table: string) {
    const columnConfig = this.formFieldConfig[table]?.columns?.find((item: any) => item.name == fieldName);
    return ((columnConfig.hidden) ? false : true);
  }
	restrictBasedonRoles(roles: any) {
    if (roles?.includes('selected')) {
       if(this.currentUserData){
        const userDataKeys = Object.keys(this.currentUserData);
        return roles?.some((item: any) => userDataKeys.includes(item.toLowerCase()));
      }
      else{
        return false;
      }
    }
    else if (roles?.includes('all'))
      return true;
    else
      return true;
  }
	initForm(){
    this.currentUserData= this.appGlobalService.getCurrentUserData();
    this.formFieldConfig= this.appUtilBaseService.getControlsFromFormConfig(this.detailFormConfig);
    this.actionBarConfig = this.appUtilBaseService.getActionsConfig(this.leftActionBarConfig.children);
    this.appUtilBaseService.configureValidators(this.detailFormControls, this.formFieldConfig);
       this.wizardItems = this.appUtilBaseService.getWizardItemFromFormConfig(this.detailFormStructureConfig, this);

 this.bindLookupFields();
    this.getData();
}
	onWizardClick(event: any) {
    this.wizardItems.forEach((item: any) => {
      delete item.styleClass;
    });
    event.item.styleClass = 'wizard-active';
    let el: any = $("#section" + event.item.id);
    if (el?.length) {

      $('.main-content').animate({
        scrollTop: el.offset().top
      }, 100);
    }
  }

    onInit() {
		
		this.waitForResponse();
this.initWorkflow();
		
this.getId();   
this.initForm();
this.calculateFormula();
this.initFormValidations();
this.activeTabIndexes = this.appUtilBaseService.generateDynamicTabViewProps(this.detailFormStructureConfig);
this.showWorkflowSimulator = Boolean(this.isPrototype && this.workFlowEnabled);
this.getUserRoles();

    }
	
     onDestroy() {
		
    }
     onAfterViewInit() {
		
		 this.scrolltoTop();
    }

}
