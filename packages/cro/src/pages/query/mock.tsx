export const dataSource = {
  "keys": [{
    "key": "medical",
    "title": "medical-mapping",
    "description": "医疗健康数据项.\n",
    "dispose": false,
    "items": [{
      "name": "basic",
      "type": "group",
      "level": "abstract",
      "show": true,
      "assign": {},
      "description": "基本信息",
      "items": [{
        "name": "basic.sid",
        "type": "int",
        "level": "entity",
        "show": true,
        "path": ["db->s_naming.t_subject->id"],
        "assign": {},
        "description": "唯一识别码"
      }, {
        "name": "basic.sex",
        "type": "option",
        "level": "option",
        "show": true,
        "path": ["db->s_naming.t_subject->details->sex"],
        "assign": {},
        "description": "性别"
      }, {
        "name": "basic.tel",
        "type": "string",
        "level": "entity",
        "show": true,
        "path": ["db->s_naming.t_subject->details->tel"],
        "assign": {},
        "description": "联系方式"
      }, {
        "name": "basic.age",
        "type": "int",
        "level": "entity",
        "show": true,
        "path": ["db->s_naming.t_subject->details->age"],
        "assign": {
          "unit": "岁"
        },
        "description": "年龄"
      }, {
        "name": "basic.height",
        "type": "int",
        "level": "entity",
        "show": true,
        "path": ["db->s_naming.t_subject->details->height"],
        "assign": {
          "unit": "cm"
        },
        "description": "身高"
      }, {
        "name": "basic.weight",
        "type": "int",
        "level": "entity",
        "show": true,
        "path": ["db->s_naming.t_subject->details->weight"],
        "assign": {
          "unit": "kg"
        },
        "description": "体重"
      }, {
        "name": "basic.waistline",
        "type": "int",
        "level": "entity",
        "show": true,
        "path": ["db->s_naming.t_subject->details->waistline"],
        "assign": {
          "unit": "cm"
        },
        "description": "腰围"
      }, {
        "name": "basic.bmi",
        "type": "int",
        "level": "entity",
        "show": true,
        "path": ["db->s_naming.t_subject->details->bmi"],
        "assign": {},
        "description": "BMI"
      }, {
        "name": "basic.ethnicity",
        "type": "option",
        "level": "option",
        "show": true,
        "path": ["db->s_naming.t_subject->details->ethnicity"],
        "assign": {},
        "description": "民族"
      }, {
        "name": "basic.provinceName",
        "type": "string",
        "level": "entity",
        "show": true,
        "path": ["db->s_naming.t_subject->details->provinceName"],
        "assign": {},
        "description": "现住址"
      }, {
        "name": "basic.detailAddress",
        "type": "string",
        "level": "entity",
        "show": true,
        "path": ["db->s_naming.t_subject->details->detailAddress"],
        "assign": {},
        "description": "详细地址"
      }]
    }, {
      "name": "medicine-image-laboratory",
      "type": "group",
      "level": "abstract",
      "show": true,
      "assign": {},
      "description": "化验单",
      "items": [{
        "name": "medicine-image-laboratory.SHQX",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->SHQX"],
        "assign": {},
        "description": "生化全项",
        "items": [{
          "name": "medicine-image-laboratory.SHQX.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->SHQX->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-laboratory.XCG",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->SHQX"],
        "assign": {},
        "description": "血常规",
        "items": [{
          "name": "medicine-image-laboratory.XCG.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->XCG->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-laboratory.NCG",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->NCG"],
        "assign": {},
        "description": "尿常规",
        "items": [{
          "name": "medicine-image-laboratory.NCG.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->NCG->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-laboratory.BCG",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->BCG"],
        "assign": {},
        "description": "便常规",
        "items": [{
          "name": "medicine-image-laboratory.BCG.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->BCG->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-laboratory.THXHDB",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->THXHDB"],
        "assign": {},
        "description": "糖化血红蛋白",
        "items": [{
          "name": "medicine-image-laboratory.THXHDB.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->THXHDB->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-laboratory.NXSX",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->NXSX"],
        "assign": {},
        "description": "凝血四项",
        "items": [{
          "name": "medicine-image-laboratory.NXSX.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->NXSX->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-laboratory.JGWX",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->JGWX"],
        "assign": {},
        "description": "甲功五项",
        "items": [{
          "name": "medicine-image-laboratory.JGWX.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->JGWX->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-laboratory.XGSX",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->XGSX"],
        "assign": {},
        "description": "心梗三项",
        "items": [{
          "name": "medicine-image-laboratory.XGSX.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->XGSX->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-laboratory.XSTLT",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->XSTLT"],
        "assign": {},
        "description": "血栓弹力图",
        "items": [{
          "name": "medicine-image-laboratory.XSTLT.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->XSTLT->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-laboratory.OTHER_HY",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->OTHER_HY"],
        "assign": {},
        "description": "其他化验单",
        "items": [{
          "name": "medicine-image-laboratory.OTHER_HY.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->OTHER_HY->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }]
    }, {
      "name": "medicine-image-inspection",
      "type": "group",
      "level": "abstract",
      "show": true,
      "assign": {},
      "description": "检查单",
      "items": [{
        "name": "medicine-image-inspection.XZCS",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->XDCS"],
        "assign": {},
        "description": "心脏超声",
        "items": [{
          "name": "medicine-image-inspection.XZCS.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->XDCS->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-inspection.XDT",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->XDT"],
        "assign": {},
        "description": "心电图",
        "items": [{
          "name": "medicine-image-inspection.XDT.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->XDT->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-inspection.HXD_24H",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->HXD_24H"],
        "assign": {},
        "description": "24h心电图",
        "items": [{
          "name": "medicine-image-inspection.HXD_24H.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->HXD_24H->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-inspection.XY_24H",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->XY_24H"],
        "assign": {},
        "description": "24h血压",
        "items": [{
          "name": "medicine-image-inspection.XY_24H.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->XY_24H->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-inspection.HCHS",
        "type": "entity",
        "level": "element",
        "show": false,
        "path": ["db->s_med.t_image->HCHS"],
        "assign": {},
        "description": "核磁／核素",
        "items": [{
          "name": "medicine-image-inspection.HCHS.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->HCHS->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-inspection.CT",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->CT"],
        "assign": {},
        "description": "CT",
        "items": [{
          "name": "medicine-image-inspection.CT.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->CT->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-inspection.GZ",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->GZ"],
        "assign": {},
        "description": "冠造",
        "items": [{
          "name": "medicine-image-inspection.GZ.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->GZ->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-inspection.XFYD",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->XFYD"],
        "assign": {},
        "description": "心肺运动",
        "items": [{
          "name": "medicine-image-inspection.XFYD.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->XFYD->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-inspection.YDPB",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->YDPB"],
        "assign": {},
        "description": "运动平板",
        "items": [{
          "name": "medicine-image-inspection.YDPB.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->YDPB->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-inspection.OTHER_JC",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->OTHER_JC"],
        "assign": {},
        "description": "其他检查",
        "items": [{
          "name": "medicine-image-inspection.OTHER_JC.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->OTHER_JC->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-inspection.ZDDBL",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->ZDDBL"],
        "assign": {},
        "description": "诊断大病历",
        "items": [{
          "name": "medicine-image-inspection.ZDDBL.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->ZDDBL->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }, {
        "name": "medicine-image-inspection.ZDZLS",
        "type": "entity",
        "level": "element",
        "show": true,
        "path": ["db->s_med.t_image->ZDZLS"],
        "assign": {},
        "description": "其他病历",
        "items": [{
          "name": "medicine-image-inspection.ZDZLS.start",
          "type": "timestamp",
          "level": "option",
          "show": false,
          "path": ["db->s_med.t_image->ZDZLS->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }]
    }, {
      "name": "end-event",
      "type": "group",
      "level": "abstract",
      "show": true,
      "path": ["db->s_research.t_end_event_statistics"],
      "assign": {},
      "description": "终点事件",
      "items": [{
        "name": "end-event.MAIN_ENDPOINT",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "主要终点",
        "items": [{
          "name": "end-event.MAIN_ENDPOINT.start",
          "type": "timestamp",
          "level": "element",
          "show": false,
          "path": ["db->s_research.t_end_event_statistics->MAIN_ENDPOINT->created_at"],
          "assign": {
            "max": "NULl",
            "min": "NUll"
          },
          "description": "上传时间"
        }]
      }, {
        "name": "end-event.SECONDARY_ENDPOINT",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "次要终点",
        "items": [{
          "name": "end-event.SECONDARY_ENDPOINT.start",
          "type": "timestamp",
          "level": "element",
          "show": false,
          "path": ["db->s_research.t_end_event_statistics->SECONDARY_ENDPOINT->created_at"],
          "assign": {
            "max": "NULl",
            "min": "NULl"
          },
          "description": "上传时间"
        }]
      }, {
        "name": "end-event.ADVERSE_EVENT",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "不良事件",
        "items": [{
          "name": "end-event.ADVERSE_EVENT.start",
          "type": "timestamp",
          "level": "element",
          "show": false,
          "path": ["db->s_research.t_end_event_statistics->ADVERSE_EVENT->created_at"],
          "assign": {
            "min": "NULl"
          },
          "description": "上传时间"
        }]
      }, {
        "name": "end-event.SAE",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "严重不良反应",
        "items": [{
          "name": "end-event.SAE.start",
          "type": "timestamp",
          "level": "element",
          "show": false,
          "path": ["db->s_research.t_end_event_statistics->SAE->created_at"],
          "assign": {
            "min": "NULl"
          },
          "description": "上传时间"
        }]
      }, {
        "name": "end-event.all",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "全部事件",
        "items": [{
          "name": "end-event.all.start",
          "type": "timestamp",
          "level": "element",
          "show": false,
          "path": ["db->s_research.t_end_event_statistics->created_at"],
          "assign": {
            "min": "NULl"
          },
          "description": "上传时间"
        }]
      }]
    }, {
      "name": "subjective",
      "type": "group",
      "level": "abstract",
      "show": true,
      "assign": {
        "value": "NUll"
      },
      "description": "主观量表",
      "items": [{
        "name": "subjective.index",
        "type": "dynamic",
        "level": "element",
        "path": ["db->s_research.t_scale_patient"],
        "assign": {
          "value": "/template/dynamic"
        },
        "description": "量表项加载中...",
        "items": [{
          "name": "subjective.index.uid",
          "type": "string",
          "level": "option",
          "path": ["db->s_research.t_scale_patient->scale_id"],
          "assign": {},
          "description": "主观量表唯一标识"
        }, {
          "name": "subjective.index.start",
          "type": "timestamp",
          "level": "option",
          "path": ["db->s_research.t_scale_patient->updated_at"],
          "assign": {},
          "description": "回复时间"
        }]
      }]
    }, {
      "name": "objective",
      "type": "group",
      "level": "abstract",
      "show": true,
      "assign": {
        "value": "NULl"
      },
      "description": "客观检查",
      "items": [{
        "name": "objective.index",
        "type": "dynamic",
        "level": "element",
        "path": ["db->s_research.t_scale_reply"],
        "assign": {
          "value": "/template/dynamic"
        },
        "description": "量表项加载中...",
        "items": [{
          "name": "objective.index.uid",
          "type": "string",
          "level": "option",
          "path": ["db->s_med.t_scale_reply->scale_id"],
          "assign": {},
          "description": "客观检查唯一标识"
        }, {
          "name": "objective.index.start",
          "type": "timestamp",
          "level": "option",
          "path": ["db->s_med.t_scale_reply->created_at"],
          "assign": {},
          "description": "回复时间"
        }]
      }]
    }, {
      "name": "crf",
      "type": "group",
      "level": "abstract",
      "show": true,
      "assign": {},
      "description": "CRF量表",
      "items": [{
        "name": "crf.index",
        "type": "dynamic",
        "level": "element",
        "path": ["db->s_research.t_scale_patient"],
        "assign": {
          "value": "/template/dynamic"
        },
        "description": "量表项加载中...",
        "items": [{
          "name": "crf.index.uid",
          "type": "string",
          "level": "option",
          "path": ["db->s_research.t_scale_patient->scale_id"],
          "assign": {},
          "description": "CRF量表唯一标识"
        }, {
          "name": "crf.index.start",
          "type": "timestamp",
          "level": "option",
          "path": ["db->s_research.t_scale_patient->updated_at"],
          "assign": {},
          "description": "回复时间"
        }]
      }]
    }, {
      "name": "medicine-index-normal",
      "type": "group",
      "level": "abstract",
      "show": true,
      "path": ["db->s_med.t_medical_index"],
      "assign": {},
      "description": "常用指标",
      "items": [{
        "name": "medicine-index-normal.index",
        "type": "dynamic",
        "level": "element",
        "path": ["db->s_med.t_medical_index->abbreviation"],
        "assign": {
          "value": "/template/dynamic"
        },
        "description": "指标项加载中...",
        "items": [{
          "name": "medicine-index-normal.index.uid",
          "type": "string",
          "level": "option",
          "path": ["db->s_med.t_medical_index->name"],
          "assign": {
            "unit": "mmHg"
          },
          "description": "指标唯一标识"
        }, {
          "name": "medicine-index-normal.index.assign",
          "type": "int",
          "level": "option",
          "path": ["db->s_med.t_medical_index->value->value"],
          "assign": {
            "unit": "mmHg"
          },
          "description": "正常值(除高血压意外的指标值)"
        }, {
          "name": "medicine-index-normal.index.low",
          "type": "int",
          "level": "option",
          "path": ["db->s_med.t_medical_index->value->low"],
          "assign": {
            "unit": "mmHg"
          },
          "description": "低压(高血压指标使用此项定义低压范围)"
        }, {
          "name": "medicine-index-normal.index.high",
          "type": "int",
          "level": "option",
          "path": ["db->s_med.t_medical_index->value->high"],
          "assign": {
            "unit": "mmHg"
          },
          "description": "高压(高血压指标使用此项定义高压范围)"
        }, {
          "name": "medicine-index-normal.index.start",
          "type": "timestamp",
          "level": "option",
          "path": ["db->s_med.t_medical_index->created_at"],
          "assign": {},
          "description": "上传时间"
        }]
      }]
    }, {
      "name": "medicine-index-img",
      "type": "group",
      "level": "abstract",
      "show": true,
      "path": ["db->s_med.t_medical_index"],
      "assign": {},
      "description": "图片结构化指标",
      "items": [{
        "name": "medicine-index-img.XZCS",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "超声",
        "items": [{
          "name": "medicine-index-img.XZCS.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->XZCS->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.XZCS.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XZCS->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.XZCS.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XZCS->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.XZCS.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XZCS->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.XZCS.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XZCS->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.XZCS.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XZCS->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.THXHDB",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "糖化血红蛋白",
        "items": [{
          "name": "medicine-index-img.THXHDB.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->THXHDB->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.THXHDB.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->THXHDB->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.THXHDB.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->THXHDB->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.THXHDB.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->THXHDB->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.THXHDB.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->THXHDB->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.THXHDB.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->THXHDB->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.NCG",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "尿常规",
        "items": [{
          "name": "medicine-index-img.NCG.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->NCG->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.NCG.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->NCG->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.NCG.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->NCG->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.NCG.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->NCG->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.NCG.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->NCG->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.NCG.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->NCG->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.CTHCHS",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "CT/核磁/核素",
        "items": [{
          "name": "medicine-index-img.CTHCHS.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->CTHCHS->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.CTHCHS.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->CTHCHS->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.CTHCHS.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->CTHCHS->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.CTHCHS.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->CTHCHS->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.CTHCHS.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->CTHCHS->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.CTHCHS.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->CTHCHS->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.NXSX",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "path": ["db->s_med.t_medical_index->NXSX->type"],
        "assign": {},
        "description": "凝血四项",
        "items": [{
          "name": "medicine-index-img.NXSX.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->NXSX->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.NXSX.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->NXSX->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.NXSX.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->NXSX->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.NXSX.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->NXSX->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.NXSX.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->NXSX->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.NXSX.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->NXSX->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.BCG",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "便常规",
        "items": [{
          "name": "medicine-index-img.BCG.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->BCG->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.BCG.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->BCG->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.BCG.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->BCG->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.BCG.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->BCG->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.BCG.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->BCG->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.BCG.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->BCG->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.GZ",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "冠造",
        "items": [{
          "name": "medicine-index-img.GZ.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->GZ->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.GZ.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->GZ->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.GZ.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->GZ->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.GZ.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->GZ->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.GZ.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->GZ->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.GZ.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->GZ->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.XGSX",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "心梗三项",
        "items": [{
          "name": "medicine-index-img.XGSX.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->XGSX->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.XGSX.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XGSX->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.XGSX.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XGSX->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.XGSX.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XGSX->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.XGSX.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XGSX->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.XGSX.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XGSX->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.XDT",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "心电图",
        "items": [{
          "name": "medicine-index-img.XDT.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->XDT->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.XDT.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XDT->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.XDT.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XDT->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.XDT.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XDT->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.XDT.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XDT->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.XDT.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XDT->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.XFYD",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "心肺运动",
        "items": [{
          "name": "medicine-index-img.XFYD.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->XFYD->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.XFYD.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XFYD->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.XFYD.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XFYD->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.XFYD.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XFYD->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.XFYD.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XFYD->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.XFYD.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XFYD->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.SHQX",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "生化全项",
        "items": [{
          "name": "medicine-index-img.SHQX.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->SHQX->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.SHQX.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->SHQX->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.SHQX.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->SHQX->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.SHQX.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->SHQX->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.SHQX.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->SHQX->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.SHQX.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->SHQX->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.HXD_24H",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "24h心电图",
        "items": [{
          "name": "medicine-index-img.HXD_24H.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->HXD_24H->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.HXD_24H.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->HXD_24H->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.HXD_24H.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->HXD_24H->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.HXD_24H.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->HXD_24H->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.HXD_24H.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->HXD_24H->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.HXD_24H.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->HXD_24H->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.JGWX",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "甲功五项",
        "items": [{
          "name": "medicine-index-img.JGWX.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->JGWX->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.JGWX.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->JGWX->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.JGWX.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->JGWX->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.JGWX.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->JGWX->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.JGWX.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->JGWX->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.JGWX.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->JGWX->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.YDPB",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "运动平板",
        "items": [{
          "name": "medicine-index-img.YDPB.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->YDPB->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.YDPB.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->YDPB->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.YDPB.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->YDPB->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.YDPB.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->YDPB->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.YDPB.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->YDPB->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.YDPB.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->YDPB->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.XCG",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "血常规",
        "items": [{
          "name": "medicine-index-img.XCG.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->XCG->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.XCG.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XCG->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.XCG.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XCG->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.XCG.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XCG->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.XCG.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XCG->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.XCG.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XCG->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.XY_24H",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "24h血压",
        "items": [{
          "name": "medicine-index-img.XY_24H.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->XY_24H->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.XY_24H.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XY_24H->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.XY_24H.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XY_24H->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.XY_24H.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XY_24H->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.XY_24H.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XY_24H->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.XY_24H.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XY_24H->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.XSTLT",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "血栓弹力图",
        "items": [{
          "name": "medicine-index-img.XSTLT.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->XSTLT->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.XSTLT.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XSTLT->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.XSTLT.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XSTLT->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.XSTLT.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XSTLT->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.XSTLT.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XSTLT->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.XSTLT.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->XSTLT->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.ZDZLS",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "其他超声",
        "items": [{
          "name": "medicine-index-img.ZDZLS.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->ZDZLS->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.ZDZLS.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->ZDZLS->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.ZDZLS.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->ZDZLS->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.ZDZLS.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->ZDZLS->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.ZDZLS.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->ZDZLS->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.ZDZLS.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->ZDZLS->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.OTHER_HY",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "其他化验单",
        "items": [{
          "name": "medicine-index-img.OTHER_HY.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->OTHER_HY->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.OTHER_HY.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->OTHER_HY->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.OTHER_HY.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->OTHER_HY->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.OTHER_HY.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->OTHER_HY->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.OTHER_HY.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->OTHER_HY->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.OTHER_HY.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->OTHER_HY->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }, {
        "name": "medicine-index-img.OTHER_JC",
        "type": "entity",
        "level": "abstract",
        "show": true,
        "assign": {},
        "description": "其他检查",
        "items": [{
          "name": "medicine-index-img.OTHER_JC.index",
          "type": "dynamic",
          "level": "element",
          "path": ["db->s_med.t_medical_index->OTHER_JC->abbreviation"],
          "assign": {
            "value": "/template/dynamic"
          },
          "description": "指标项加载中...",
          "items": [{
            "name": "medicine-index-img.OTHER_JC.index.uid",
            "type": "string",
            "level": "option",
            "path": ["db->s_med.t_medical_index->OTHER_JC->name"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "指标唯一标识"
          }, {
            "name": "medicine-index-img.OTHER_JC.index.assign",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->OTHER_JC->value->value"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "正常值(除高血压意外的指标值)"
          }, {
            "name": "medicine-index-img.OTHER_JC.index.low",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->OTHER_JC->value->low"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "低压(高血压指标使用此项定义低压范围)"
          }, {
            "name": "medicine-index-img.OTHER_JC.index.high",
            "type": "int",
            "level": "option",
            "path": ["db->s_med.t_medical_index->OTHER_JC->value->high"],
            "assign": {
              "unit": "mmHg"
            },
            "description": "高压(高血压指标使用此项定义高压范围)"
          }, {
            "name": "medicine-index-img.OTHER_JC.index.start",
            "type": "timestamp",
            "level": "option",
            "path": ["db->s_med.t_medical_index->OTHER_JC->created_at"],
            "assign": {},
            "description": "上传时间"
          }]
        }]
      }]
    }]
  }]
}
