window.__ModuleLoader__.load({
  id: '@local/euribor-trend',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useEffect, useMemo, useRef, useState } = React;

    const NS = 'euriborTrend';
    const PANEL_ID = 'euribor';

    /**
     * Monthly EURIBOR averages, in percent per annum.
     * Source: ECB Data Portal, dataflow FM, series
     * FM.M.U2.EUR.RT.MM.EURIBOR{1,3,6}MD_.HSTA and EURIBOR1YD_.HSTA
     * (retrieved 2026-11-04).
     * `values` arrays align with sequential months from `start` through `end`.
     */
    const SEED = {"source":"European Central Bank — Data Portal (FM)","retrieved":"2026-11-04","start":"1999-01","end":"2026-10","values":{"1m":[3.1584,3.1264,3.0548,2.6947,2.5661,2.6055,2.6345,2.6135,2.5835,2.7629,3.0607,3.5094,3.1502,3.3591,3.5892,3.7909,4.1632,4.3702,4.4077,4.5743,4.6977,4.854,4.9249,4.9483,4.8049,4.7996,4.7761,4.7799,4.6634,4.53,4.5247,4.4647,4.0508,3.7189,3.4267,3.4182,3.348,3.3363,3.3456,3.3357,3.374,3.3835,3.3612,3.3328,3.3174,3.306,3.2312,2.9799,2.8548,2.7748,2.601,2.5763,2.5204,2.177,2.1306,2.1223,2.126,2.1001,2.0868,2.1315,2.0759,2.0606,2.0428,2.0523,2.061,2.0762,2.0755,2.077,2.0778,2.0862,2.1101,2.167,2.111,2.1039,2.103,2.1047,2.1041,2.1039,2.1064,2.1126,2.1152,2.1209,2.2225,2.4112,2.3885,2.4587,2.6333,2.6489,2.6926,2.8691,2.9389,3.0941,3.1572,3.3501,3.4214,3.64,3.6159,3.6511,3.8439,3.859,3.9194,4.0982,4.105,4.3081,4.4339,4.2355,4.216,4.7114,4.1973,4.1821,4.3046,4.3691,4.3874,4.4724,4.4716,4.4875,4.6599,4.8313,3.8433,2.9929,2.1418,1.6283,1.2691,1.012,0.8844,0.9134,0.6097,0.508,0.4551,0.4297,0.4352,0.478,0.437,0.4215,0.4062,0.4047,0.423,0.4464,0.5833,0.64,0.6181,0.7842,0.8339,0.8107,0.7928,0.8937,0.9031,1.1271,1.2434,1.279,1.4218,1.3734,1.3472,1.3635,1.2266,1.143,0.8362,0.626,0.4674,0.4088,0.3938,0.38,0.2194,0.1316,0.1188,0.1112,0.1085,0.1106,0.1125,0.1203,0.118,0.1179,0.1123,0.1206,0.125,0.1278,0.1281,0.1283,0.132,0.2144,0.2242,0.2239,0.2318,0.2526,0.2592,0.1529,0.0958,0.0855,0.0177,0.0079,0.0098,0.023,0.0051,0.0004,-0.0103,-0.0289,-0.0494,-0.0634,-0.0713,-0.0879,-0.1052,-0.1156,-0.1403,-0.1895,-0.2226,-0.246,-0.3076,-0.3412,-0.348,-0.3559,-0.3688,-0.3697,-0.3714,-0.3714,-0.3728,-0.3704,-0.3713,-0.3718,-0.3724,-0.3724,-0.3732,-0.3728,-0.3728,-0.372,-0.3721,-0.3723,-0.3716,-0.3687,-0.3688,-0.3696,-0.3706,-0.3716,-0.3708,-0.3703,-0.3697,-0.3696,-0.3709,-0.3697,-0.3688,-0.3671,-0.3664,-0.3677,-0.3675,-0.3672,-0.369,-0.3848,-0.3951,-0.4096,-0.4482,-0.4555,-0.45,-0.4529,-0.4569,-0.4731,-0.4777,-0.4281,-0.4643,-0.4929,-0.5088,-0.5173,-0.5217,-0.5385,-0.5414,-0.5607,-0.5621,-0.5534,-0.5534,-0.555,-0.5579,-0.5546,-0.5562,-0.5601,-0.5576,-0.5604,-0.5654,-0.5963,-0.5649,-0.553,-0.5444,-0.5373,-0.5457,-0.5247,-0.3064,0.0224,0.5739,0.9152,1.4231,1.7243,1.9812,2.3688,2.7099,2.9609,3.1524,3.3425,3.469,3.627,3.7577,3.861,3.8407,3.8576,3.869,3.8685,3.853,3.8525,3.8159,3.6347,3.6175,3.5967,3.4381,3.2055,3.0664,2.8901,2.7919,2.6058,2.401,2.2426,2.0939,1.9285,1.8923,1.89,1.8972,1.9063,1.9056,1.9155,1.9608,1.9523,1.9328,1.9712,1.9566,2.1463,2.214,2.221,2.4144,2.4358],"3m":[3.1321,3.0934,3.0467,2.6965,2.579,2.6267,2.6765,2.695,2.7267,3.3757,3.4677,3.446,3.3431,3.5368,3.747,3.9253,4.362,4.5017,4.5829,4.7771,4.8528,5.0413,5.092,4.9392,4.7707,4.7558,4.7086,4.682,4.6367,4.4536,4.4671,4.3535,3.9829,3.5999,3.3857,3.3449,3.3388,3.3571,3.3908,3.4069,3.4671,3.464,3.41,3.3519,3.3101,3.2613,3.1241,2.9411,2.8318,2.6875,2.53,2.5334,2.4005,2.1519,2.13,2.1404,2.1473,2.1436,2.1591,2.1463,2.0895,2.0706,2.0288,2.0488,2.0859,2.1127,2.116,2.1143,2.1186,2.1473,2.1703,2.1732,2.1454,2.1384,2.1372,2.1372,2.1256,2.111,2.1194,2.1325,2.1391,2.1966,2.3609,2.4729,2.5117,2.6004,2.7226,2.7938,2.889,2.9857,3.1022,3.2265,3.3354,3.502,3.5972,3.6842,3.7519,3.8182,3.8909,3.9753,4.0714,4.1478,4.2162,4.5436,4.7417,4.6874,4.6385,4.8484,4.4815,4.3621,4.5964,4.7835,4.8574,4.9405,4.961,4.9652,5.0192,5.1131,4.2383,3.2926,2.4565,1.9431,1.6355,1.4223,1.2817,1.2279,0.975,0.8605,0.7721,0.7375,0.7162,0.712,0.6798,0.6617,0.645,0.6447,0.6865,0.7276,0.8488,0.8955,0.8805,0.9977,1.042,1.0217,1.0172,1.0868,1.1755,1.3212,1.4251,1.4886,1.5976,1.5521,1.5365,1.5759,1.4847,1.4261,1.2222,1.0483,0.8585,0.7443,0.6849,0.6589,0.497,0.3324,0.2463,0.2079,0.192,0.1855,0.2049,0.2234,0.2061,0.2089,0.2012,0.2103,0.2214,0.2259,0.2232,0.2258,0.2234,0.2735,0.292,0.2881,0.3053,0.3298,0.3246,0.2414,0.205,0.1916,0.0971,0.0826,0.0809,0.0809,0.0627,0.0482,0.0272,0.0047,-0.0104,-0.0139,-0.0187,-0.0277,-0.037,-0.0536,-0.0876,-0.1263,-0.1461,-0.1836,-0.2285,-0.2492,-0.2572,-0.2679,-0.2945,-0.2982,-0.3016,-0.309,-0.3127,-0.3158,-0.3255,-0.3286,-0.3293,-0.3304,-0.3295,-0.33,-0.3304,-0.3291,-0.3294,-0.3295,-0.329,-0.3279,-0.3285,-0.3285,-0.3279,-0.3284,-0.3252,-0.322,-0.3207,-0.319,-0.3188,-0.3177,-0.3164,-0.3119,-0.308,-0.3084,-0.3092,-0.3104,-0.3119,-0.3289,-0.3649,-0.4077,-0.4176,-0.4129,-0.4013,-0.3947,-0.3911,-0.4088,-0.4166,-0.254,-0.272,-0.376,-0.4441,-0.4797,-0.4914,-0.5091,-0.5209,-0.5381,-0.5471,-0.5411,-0.5391,-0.5381,-0.5401,-0.5429,-0.5448,-0.5476,-0.545,-0.5498,-0.5674,-0.582,-0.5601,-0.5315,-0.4954,-0.4479,-0.3857,-0.2392,0.0366,0.3947,1.0109,1.4277,1.8252,2.0635,2.3449,2.6404,2.9106,3.1794,3.3717,3.5359,3.6718,3.7803,3.88,3.9676,3.9716,3.9349,3.9253,3.9232,3.9231,3.8853,3.8127,3.7245,3.6848,3.5476,3.4337,3.1666,3.0068,2.8246,2.7043,2.525,2.4424,2.2494,2.0872,1.9836,1.9863,2.0211,2.0273,2.0344,2.0417,2.0484,2.0277,2.0113,2.1094,2.1753,2.2261,2.339,2.4254,2.5131,2.635,2.6347],"6m":[3.0915,3.04,3.025,2.7043,2.5976,2.6801,2.8975,3.0533,3.1071,3.4571,3.4843,3.5117,3.5563,3.7347,3.9362,4.0827,4.5439,4.6811,4.8369,5.011,5.038,5.1033,5.1308,4.9197,4.6753,4.6664,4.5769,4.5664,4.5578,4.3529,4.3873,4.2249,3.8758,3.4593,3.2625,3.2556,3.3423,3.3976,3.5001,3.536,3.6264,3.5903,3.4836,3.3798,3.2695,3.1676,3.0369,2.8924,2.7581,2.5777,2.4507,2.4695,2.3084,2.0843,2.0925,2.1721,2.1776,2.1727,2.2241,2.1995,2.1154,2.0859,2.0185,2.0614,2.136,2.1885,2.1878,2.1691,2.2003,2.1906,2.2173,2.2065,2.192,2.1846,2.1918,2.1722,2.1441,2.1069,2.1345,2.1595,2.1666,2.272,2.5002,2.6003,2.6507,2.7249,2.872,2.9561,3.0582,3.158,3.2875,3.4096,3.5275,3.6446,3.7281,3.7894,3.8897,3.9444,3.9963,4.0974,4.1966,4.283,4.3585,4.5938,4.7514,4.6634,4.6297,4.8194,4.5014,4.3565,4.593,4.7954,4.8975,5.0883,5.1482,5.1602,5.219,5.1781,4.2947,3.3653,2.5389,2.0341,1.7745,1.6083,1.4803,1.4356,1.2129,1.1154,1.0423,1.0167,0.9931,0.9956,0.9773,0.9646,0.9524,0.9552,0.9822,1.0118,1.1042,1.1472,1.1373,1.2239,1.269,1.2507,1.2536,1.3523,1.4833,1.6214,1.7068,1.7493,1.8182,1.7548,1.736,1.7761,1.7065,1.6707,1.5047,1.3454,1.1637,1.0402,0.9704,0.9345,0.7794,0.6061,0.4839,0.4118,0.3604,0.3238,0.3443,0.3619,0.3288,0.3243,0.2995,0.3209,0.3358,0.3422,0.34,0.3415,0.3269,0.3706,0.396,0.3866,0.4069,0.4299,0.4169,0.3332,0.3046,0.2918,0.1997,0.1837,0.1818,0.1765,0.1523,0.1259,0.0969,0.0728,0.0571,0.0492,0.0487,0.0439,0.0353,0.0197,-0.0154,-0.0398,-0.0608,-0.1153,-0.1336,-0.138,-0.1445,-0.1624,-0.1882,-0.1887,-0.1991,-0.2071,-0.2148,-0.2179,-0.2355,-0.2405,-0.2407,-0.2455,-0.2509,-0.2668,-0.2726,-0.2717,-0.2726,-0.2739,-0.2743,-0.2714,-0.2742,-0.2749,-0.2713,-0.2702,-0.27,-0.2685,-0.2692,-0.2668,-0.2682,-0.264,-0.2566,-0.2408,-0.2364,-0.2318,-0.2302,-0.2307,-0.2374,-0.279,-0.3474,-0.405,-0.3939,-0.3616,-0.3374,-0.3355,-0.3301,-0.3552,-0.3649,-0.192,-0.143,-0.2227,-0.3461,-0.4329,-0.4626,-0.494,-0.509,-0.5186,-0.5285,-0.5205,-0.516,-0.5158,-0.513,-0.515,-0.516,-0.5274,-0.5224,-0.5272,-0.534,-0.5446,-0.5273,-0.4761,-0.4177,-0.3109,-0.1436,0.1617,0.4665,0.837,1.5961,1.9974,2.3212,2.5603,2.8579,3.1354,3.2674,3.5156,3.6818,3.8253,3.9425,3.9445,4.0303,4.1148,4.0647,3.9269,3.8917,3.9005,3.8948,3.8382,3.7866,3.7149,3.6436,3.4249,3.2578,3.0016,2.7875,2.6322,2.6144,2.4596,2.3854,2.2017,2.1162,2.0497,2.0553,2.0844,2.1023,2.1068,2.131,2.1395,2.1371,2.1435,2.322,2.4538,2.5364,2.5955,2.6467,2.7133,2.9216,2.9747],"12m":[3.0617,3.0297,3.0462,2.7564,2.6827,2.8363,3.03,3.2373,3.3011,3.6837,3.6892,3.8263,3.9495,4.1114,4.2675,4.3645,4.8485,4.9649,5.105,5.2484,5.2192,5.2184,5.1933,4.8809,4.5736,4.5913,4.4711,4.4811,4.5205,4.3125,4.3109,4.1075,3.77,3.3694,3.1979,3.2981,3.4832,3.5937,3.8156,3.8602,3.9627,3.8688,3.6448,3.4404,3.2364,3.1259,3.0174,2.8716,2.7045,2.5036,2.4112,2.447,2.2521,2.0137,2.0761,2.2786,2.2576,2.3025,2.4104,2.3808,2.2163,2.1631,2.055,2.1627,2.2974,2.4044,2.361,2.302,2.377,2.3161,2.3283,2.301,2.3121,2.31,2.3348,2.2651,2.1933,2.1028,2.168,2.2229,2.2195,2.4136,2.6844,2.7833,2.8335,2.9141,3.1053,3.2214,3.3078,3.4005,3.5386,3.6151,3.7153,3.7992,3.8637,3.9209,4.0644,4.0935,4.1055,4.2527,4.3731,4.5055,4.5638,4.6663,4.7245,4.6467,4.6072,4.7929,4.498,4.3489,4.5901,4.8199,4.9938,5.3608,5.3932,5.323,5.3839,5.2478,4.3504,3.452,2.6216,2.1354,1.9089,1.771,1.6445,1.6105,1.412,1.3343,1.261,1.2426,1.2306,1.2424,1.2322,1.2252,1.2151,1.2252,1.2493,1.2813,1.3734,1.421,1.4205,1.4954,1.5405,1.5261,1.55,1.714,1.9241,2.0856,2.1471,2.1441,2.1827,2.0969,2.0669,2.1101,2.0439,2.0035,1.8366,1.6783,1.4985,1.3678,1.266,1.219,1.0608,0.8766,0.7399,0.6501,0.5879,0.5493,0.5753,0.5942,0.545,0.5284,0.4838,0.5071,0.5254,0.5423,0.5434,0.541,0.5064,0.5425,0.5621,0.549,0.5773,0.604,0.5923,0.5127,0.4875,0.4691,0.3623,0.3376,0.3347,0.3285,0.2982,0.2551,0.2124,0.1805,0.1654,0.163,0.1673,0.1613,0.1536,0.1279,0.0789,0.0589,0.0424,-0.0079,-0.0124,-0.0098,-0.0126,-0.028,-0.056,-0.0483,-0.0571,-0.0688,-0.074,-0.0804,-0.0945,-0.1059,-0.1096,-0.119,-0.1272,-0.1491,-0.1541,-0.1563,-0.1683,-0.1798,-0.189,-0.1897,-0.1887,-0.1912,-0.191,-0.1897,-0.188,-0.1815,-0.1795,-0.1693,-0.1662,-0.1538,-0.1474,-0.1287,-0.1159,-0.1084,-0.1088,-0.1122,-0.1339,-0.1902,-0.2833,-0.3563,-0.3391,-0.3042,-0.272,-0.2614,-0.2534,-0.2881,-0.2656,-0.1082,-0.0813,-0.1475,-0.2789,-0.3589,-0.4146,-0.466,-0.4806,-0.4966,-0.5047,-0.5008,-0.4867,-0.4835,-0.4806,-0.4839,-0.4907,-0.4982,-0.4923,-0.4768,-0.487,-0.502,-0.4767,-0.3352,-0.2374,0.0131,0.2866,0.8522,0.9915,1.2495,2.233,2.6294,2.8283,3.0181,3.337,3.5336,3.6466,3.7566,3.8622,4.0073,4.149,4.073,4.1492,4.16,4.0221,3.6791,3.6092,3.6705,3.7179,3.7033,3.6801,3.6496,3.5259,3.1661,2.936,2.6913,2.5056,2.4361,2.5252,2.407,2.3984,2.1434,2.0806,2.0809,2.0791,2.1139,2.1715,2.1873,2.2169,2.2671,2.2451,2.2207,2.5651,2.7468,2.8042,2.7976,2.8551,2.9537,3.247,3.2386]}};

    /** Last dataset fetched in this page session; a remounted panel reuses it. */
    let latestDataset = SEED;

    const SERIES = [
      { id: '1m', label: '1M', color: 'var(--dsw-alias-state-success-primary)' },
      { id: '3m', label: '3M', color: 'var(--dsw-alias-brand-primary)' },
      { id: '6m', label: '6M', color: 'var(--dsw-alias-state-warn-primary)' },
      { id: '12m', label: '12M', color: 'var(--dsw-alias-state-error-primary)' },
    ];

    const RANGES = [
      { id: '1Y', months: 12, label: 'range1Y' },
      { id: '3Y', months: 36, label: 'range3Y' },
      { id: '5Y', months: 60, label: 'range5Y' },
      { id: '10Y', months: 120, label: 'range10Y' },
      { id: 'MAX', months: null, label: 'rangeMax' },
    ];

    const EN = {
      panel: 'Euribor',
      title: 'Euribor',
      subtitle: 'Euro interbank offered rate · monthly average, % per annum',
      source: 'ECB Data Portal',
      retrieved: 'Retrieved {date}',
      through: 'Data through {month}',
      refresh: 'Refresh data',
      refreshing: 'Refreshing…',
      refreshTitle: 'Fetch the latest monthly averages from the ECB Data Portal',
      refreshFailed: 'Could not reach the ECB Data Portal. The saved snapshot is still shown.',
      refreshedAt: 'Refreshed {time}',
      refreshWait: 'The ECB request can take up to a minute.',
      range: 'Range',
      range1Y: '1Y',
      range3Y: '3Y',
      range5Y: '5Y',
      range10Y: '10Y',
      rangeMax: 'All',
      statLatest: 'Latest 3M',
      statMonth: '1-month change (3M)',
      statYear: '12-month change (3M)',
      statRange: 'Range · {range}',
      statRangeCaption: '3M low / high',
      vsPrevious: 'vs {month}',
      vsYear: 'vs {month}',
      ppValue: '{value} pp',
      chartTitle: 'Monthly trend',
      chartHint: 'Monthly fixing averages; hover the chart or use the arrow keys.',
      chartAria: 'Euribor {range} monthly trend chart',
      legendHint: 'Select a tenor to show or hide it',
      tableTitle: 'Recent months',
      tableHint: 'Latest 12 monthly averages',
      month: 'Month',
      latest: 'latest',
      footer: 'Monthly averages of Euribor fixings. Source: ECB Data Portal, series FM.M.U2.EUR.RT.MM.EURIBOR1MD_, EURIBOR3MD_, EURIBOR6MD_ and EURIBOR1YD_.HSTA. Data through {month}.',
    };

    const ZH = {
      panel: 'Euribor',
      title: 'Euribor 利率走势',
      subtitle: '欧元区银行间同业拆借利率 · 月度平均值（年化 %）',
      source: '欧洲央行数据门户',
      retrieved: '数据获取于 {date}',
      through: '数据截至 {month}',
      refresh: '刷新数据',
      refreshing: '正在刷新…',
      refreshTitle: '从欧洲央行数据门户抓取最新月度平均值',
      refreshFailed: '无法连接欧洲央行数据门户，仍在显示已保存的数据快照。',
      refreshedAt: '刷新于 {time}',
      refreshWait: '欧洲央行接口可能需要约一分钟。',
      range: '时间范围',
      range1Y: '1 年',
      range3Y: '3 年',
      range5Y: '5 年',
      range10Y: '10 年',
      rangeMax: '全部',
      statLatest: '3 个月期最新',
      statMonth: '环比变化（3M）',
      statYear: '同比变化（3M）',
      statRange: '区间 · {range}',
      statRangeCaption: '3 个月期最低 / 最高',
      vsPrevious: '对比 {month}',
      vsYear: '对比 {month}',
      ppValue: '{value} 个百分点',
      chartTitle: '月度走势',
      chartHint: '月度定盘价平均值；悬停图表或使用方向键查看数值。',
      chartAria: 'Euribor {range} 月度走势图',
      legendHint: '点击期限可显示或隐藏',
      tableTitle: '近 12 个月',
      tableHint: '最近 12 个月的月度平均值',
      month: '月份',
      latest: '最新',
      footer: 'Euribor 定盘价的月度平均值。数据来源：欧洲央行数据门户，序列 FM.M.U2.EUR.RT.MM.EURIBOR1MD_、EURIBOR3MD_、EURIBOR6MD_ 与 EURIBOR1YD_.HSTA。数据截至 {month}。',
    };

    /** Sequential YYYY-MM labels between two inclusive months. */
    function buildMonths(start, end) {
      const out = [];
      let year = Number(start.slice(0, 4));
      let month = Number(start.slice(5, 7));
      const endYear = Number(end.slice(0, 4));
      const endMonth = Number(end.slice(5, 7));
      while (year < endYear || (year === endYear && month <= endMonth)) {
        out.push(year + '-' + (month < 10 ? '0' : '') + month);
        month += 1;
        if (month > 12) { month = 1; year += 1; }
      }
      return out;
    }

    
    /**
     * Validate the Host's refresh payload and normalize it to the same shape
     * as the bundled snapshot. A malformed payload is rejected so the chart
     * keeps showing the last good dataset.
     */
    function normalizeDataset(raw) {
      if (raw === null || typeof raw !== 'object') throw new Error('invalid dataset');
      const start = raw.start;
      const end = raw.end;
      if (typeof start !== 'string' || typeof end !== 'string'
        || !/^\d{4}-\d{2}$/.test(start) || !/^\d{4}-\d{2}$/.test(end)) {
        throw new Error('invalid dataset range');
      }
      const months = buildMonths(start, end);
      if (months.length < 13) throw new Error('dataset is too short');
      const values = {};
      for (const series of SERIES) {
        const list = raw.values === undefined || raw.values === null ? undefined : raw.values[series.id];
        if (!Array.isArray(list) || list.length !== months.length) {
          throw new Error('invalid dataset series ' + series.id);
        }
        values[series.id] = list.map(value => (typeof value === 'number' && Number.isFinite(value)) ? value : null);
      }
      return {
        start,
        end,
        retrieved: typeof raw.retrieved === 'string' ? raw.retrieved : new Date().toISOString(),
        values,
      };
    }

    function timeLabel(timestamp, locale) {
      return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : locale, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(timestamp));
    }

    const monthFormatterCache = new Map();
    function monthFormatter(locale, style) {
      const key = locale + '|' + style;
      let formatter = monthFormatterCache.get(key);
      if (formatter === undefined) {
        const language = locale === 'zh' ? 'zh-CN' : locale;
        formatter = new Intl.DateTimeFormat(language, style === 'short'
          ? { month: 'short', year: 'numeric', timeZone: 'UTC' }
          : { month: 'long', year: 'numeric', timeZone: 'UTC' });
        monthFormatterCache.set(key, formatter);
      }
      return formatter;
    }

    function monthLabel(month, locale, style) {
      const [year, monthNumber] = month.split('-').map(Number);
      return monthFormatter(locale, style).format(new Date(Date.UTC(year, monthNumber - 1, 1)));
    }

    function percentText(value) {
      return Number.isFinite(value) ? value.toFixed(3) + '%' : '—';
    }

    function changeText(value, t) {
      if (!Number.isFinite(value)) return '—';
      const sign = value >= 0 ? '+' : '-';
      return t('ppValue', { value: sign + Math.abs(value).toFixed(2) });
    }

    function axisPercent(value, span) {
      return value.toFixed(span < 0.4 ? 2 : 1) + '%';
    }

    /** Evenly sampled indices, always including both ends. */
    function sampleIndices(count, wanted) {
      if (count <= 1) return [0];
      const ticks = Math.max(2, Math.min(wanted, count));
      const out = [];
      for (let step = 0; step < ticks; step += 1) {
        out.push(Math.round((step * (count - 1)) / (ticks - 1)));
      }
      return out.filter((value, index) => out.indexOf(value) === index);
    }

    /** Human-friendly tick values covering [min, max]. */
    function axisTicks(min, max, target) {
      const span = max - min;
      if (!(span > 0)) return [min];
      const maxTicks = Math.max(4, target + 2);
      const candidates = [];
      for (let exponent = -4; exponent <= 3; exponent += 1) {
        for (const factor of [1, 2, 5]) candidates.push(factor * Math.pow(10, exponent));
      }
      candidates.sort((left, right) => left - right);
      for (const step of candidates) {
        const ticks = [];
        for (let value = Math.ceil(min / step - 1e-9) * step; value <= max + step * 1e-6; value += step) {
          ticks.push(Math.round(value * 1e6) / 1e6);
        }
        if (ticks.length >= 3 && ticks.length <= maxTicks) return ticks;
      }
      return [min, max];
    }

    const CSS = `
.eu-root {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
  font-size: 14px;
  line-height: 1.6;
}
.eu-scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  scrollbar-gutter: stable;
}
.eu-content {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 clamp(24px, 4vw, 48px) 48px;
}
.eu-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px 24px;
  padding-top: 28px;
  margin-bottom: 22px;
}
[data-platform='darwin'] .eu-content .eu-head {
  padding-top: calc(28px + var(--dsh-frame-top-clearance, 0px));
}
.eu-title {
  margin: 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
}
.eu-subtitle {
  margin: 3px 0 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  line-height: 20px;
}
.eu-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
}
.eu-source {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  border: 0.5px solid var(--dsw-alias-border-l1);
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-1);
}
.eu-source-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dsw-alias-brand-primary);
}
.eu-meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}
.eu-refresh {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 11px;
  border: 0.5px solid var(--dsw-alias-border-l1);
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
  white-space: nowrap;
}
.eu-refresh:hover:not(:disabled) {
  border-color: var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-layer-2);
}
.eu-refresh:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 2px;
}
.eu-refresh:disabled {
  cursor: default;
  opacity: 0.65;
}
.eu-refresh-icon {
  width: 14px;
  height: 14px;
  flex: none;
}
.eu-refresh[aria-busy='true'] .eu-refresh-icon {
  animation: eu-spin 0.9s linear infinite;
}
@keyframes eu-spin {
  to { transform: rotate(360deg); }
}
.eu-alert {
  margin: 0 0 16px;
  padding: 9px 12px;
  border: 0.5px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 45%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);
  color: var(--dsw-alias-state-error-primary);
  font-size: 12px;
  line-height: 18px;
}
@media (prefers-reduced-motion: reduce) {
  .eu-refresh[aria-busy='true'] .eu-refresh-icon { animation: none; }
}
.eu-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}
.eu-stat {
  min-width: 0;
  padding: 14px 16px;
  border: 0.5px solid var(--dsw-alias-border-l1);
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1);
}
.eu-stat-label {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.eu-stat-value {
  margin-top: 4px;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.eu-stat-value[data-compact='true'] {
  font-size: 19px;
}
.eu-stat-caption {
  margin-top: 2px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.eu-card {
  padding: 18px 20px 16px;
  border: 0.5px solid var(--dsw-alias-border-l1);
  border-radius: 16px;
  background: var(--dsw-alias-bg-layer-1);
}
.eu-card-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.eu-card-title {
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
}
.eu-card-hint {
  margin-top: 2px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
}
.eu-seg {
  display: inline-flex;
  flex: none;
  gap: 2px;
  padding: 2px;
  border-radius: 9px;
  background: var(--dsw-alias-bg-layer-2);
}
.eu-seg button {
  min-width: 40px;
  padding: 4px 10px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 12px;
  line-height: 20px;
  cursor: pointer;
  white-space: nowrap;
}
.eu-seg button:hover { color: var(--dsw-alias-label-primary); }
.eu-seg button[aria-pressed='true'] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 0 0 0.5px var(--dsw-alias-border-l1);
}
.eu-seg button:focus-visible,
.eu-chip:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 2px;
}
.eu-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 4px 0 8px;
}
.eu-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 10px;
  border: 0.5px solid var(--dsw-alias-border-l1);
  border-radius: 999px;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
}
.eu-chip[aria-pressed='false'] { opacity: 0.42; }
.eu-chip:hover { border-color: var(--dsw-alias-border-l2); }
.eu-dot {
  width: 8px;
  height: 8px;
  flex: none;
  border-radius: 50%;
}
.eu-chip-value {
  color: var(--dsw-alias-label-secondary);
  font-variant-numeric: tabular-nums;
}
.eu-chart-wrap {
  position: relative;
  width: 100%;
  margin-top: 2px;
}
.eu-chart {
  display: block;
  width: 100%;
  touch-action: pan-y;
  border-radius: 10px;
}
.eu-chart:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 3px;
}
.eu-axis-text {
  fill: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.eu-grid { stroke: var(--dsw-alias-border-l1); stroke-width: 1; }
.eu-zero { stroke: var(--dsw-alias-border-l2); stroke-width: 1; stroke-dasharray: 4 4; }
.eu-crosshair { stroke: var(--dsw-alias-border-l2); stroke-width: 1; stroke-dasharray: 3 3; }
.eu-tip {
  position: absolute;
  z-index: 2;
  width: 196px;
  padding: 8px 10px;
  border: 0.5px solid var(--dsw-alias-border-l2);
  border-radius: 10px;
  background: var(--dsw-alias-bg-overlay);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);
  pointer-events: none;
}
.eu-tip-month {
  margin-bottom: 4px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 16px;
}
.eu-tip-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  line-height: 19px;
  font-variant-numeric: tabular-nums;
}
.eu-tip-name {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--dsw-alias-label-secondary);
}
.eu-tip-value { color: var(--dsw-alias-label-primary); }
.eu-table-card {
  margin-top: 20px;
  border: 0.5px solid var(--dsw-alias-border-l1);
  border-radius: 14px;
  background: var(--dsw-alias-bg-layer-1);
  overflow: hidden;
}
.eu-table-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 16px 18px 8px;
}
.eu-table-scroll { overflow-x: auto; }
.eu-table {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}
.eu-table th {
  padding: 7px 18px;
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  font-weight: 400;
  text-align: right;
  white-space: nowrap;
}
.eu-table td {
  padding: 7px 18px;
  border-bottom: 0.5px solid var(--dsw-alias-border-l1);
  text-align: right;
  white-space: nowrap;
}
.eu-table th:first-child,
.eu-table td:first-child { text-align: left; }
.eu-table tbody tr:last-child td { border-bottom: 0; }
.eu-table tbody tr:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 4%, transparent); }
.eu-table tr[data-latest='true'] td { font-weight: 500; }
.eu-tag {
  display: inline-block;
  margin-left: 8px;
  padding: 0 6px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent);
  color: var(--dsw-alias-brand-primary);
  font-size: 10px;
  line-height: 17px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
.eu-footer {
  margin: 18px 2px 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 19px;
}
.eu-footer p { margin: 0 0 2px; }
@media (max-width: 820px) {
  .eu-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 767px) {
  .eu-content { padding-inline: 20px; }
  .eu-card { padding: 16px 14px 12px; }
}
@media (max-width: 560px) {
  .eu-head { align-items: flex-start; }
  .eu-meta { align-items: flex-start; }
  .eu-meta-row { justify-content: flex-start; }
  .eu-stats { grid-template-columns: minmax(0, 1fr); }
  .eu-stat-value { font-size: 22px; }
}
`;

    function EuriborPanelIcon({ size = 20 }) {
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        'aria-hidden': true,
        style: { display: 'block' },
      },
      h('path', {
        d: 'M3.5 17.5 8.5 12l3.6 3.1L20.5 5.8',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }),
      h('path', {
        d: 'M3.5 21h17',
        stroke: 'currentColor',
        strokeWidth: 1.4,
        strokeLinecap: 'round',
        opacity: 0.4,
      }),
      h('circle', { cx: 8.5, cy: 12, r: 1.5, fill: 'currentColor' }),
      h('circle', { cx: 12.1, cy: 15.1, r: 1.5, fill: 'currentColor' }));
    }

    function EuriborPanel(props) {
      const t = props.t;
      const locale = props.getLocale();
      const [rangeId, setRangeId] = useState('5Y');
      const [hidden, setHidden] = useState({});
      const [hover, setHover] = useState(null);
      const [dataset, setDataset] = useState(latestDataset);
      const [refresh, setRefresh] = useState({ state: 'idle', at: null, failed: false });
      const wrapRef = useRef(null);
      const [width, setWidth] = useState(720);

      useEffect(() => {
        const element = wrapRef.current;
        if (element === null || typeof ResizeObserver === 'undefined') return undefined;
        const measure = () => setWidth(Math.max(280, Math.round(element.clientWidth)));
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        return () => observer.disconnect();
      }, []);

      const months = useMemo(() => buildMonths(dataset.start, dataset.end), [dataset]);
      const values = dataset.values;
      const lastIndex = months.length - 1;
      const retrievedDate = typeof dataset.retrieved === 'string' && dataset.retrieved.includes('T')
        ? dataset.retrieved.slice(0, 10) : dataset.retrieved;
      const loading = refresh.state === 'loading';

      async function refreshData() {
        if (loading) return;
        setRefresh(current => ({ ...current, state: 'loading', failed: false }));
        try {
          const response = await fetch('/euribor-trend/data', {
            cache: 'no-store',
            headers: { accept: 'application/json' },
          });
          if (!response.ok) throw new Error('HTTP ' + response.status);
          const next = normalizeDataset(await response.json());
          latestDataset = next;
          setDataset(next);
          setRefresh({ state: 'idle', at: Date.now(), failed: false });
        } catch (error) {
          console.warn('euribor-trend: refresh failed', error);
          setRefresh(current => ({ ...current, state: 'idle', failed: true }));
        }
      }

      const range = RANGES.find(candidate => candidate.id === rangeId) || RANGES[2];
      const firstIndex = range.months === null ? 0 : Math.max(0, lastIndex - range.months);
      const count = lastIndex - firstIndex + 1;

      useEffect(() => { setHover(null); }, [rangeId]);

      const windowValues = useMemo(() => {
        const out = {};
        for (const series of SERIES) {
          out[series.id] = values[series.id].slice(firstIndex, lastIndex + 1);
        }
        return out;
      }, [values, firstIndex, lastIndex]);

      const domain = useMemo(() => {
        let low = Infinity;
        let high = -Infinity;
        for (const series of SERIES) {
          for (const value of windowValues[series.id]) {
            if (Number.isFinite(value)) {
              low = Math.min(low, value);
              high = Math.max(high, value);
            }
          }
        }
        if (!Number.isFinite(low) || !Number.isFinite(high)) return { low: 0, high: 1 };
        const padding = Math.max((high - low) * 0.12, 0.06);
        return { low: low - padding, high: high + padding };
      }, [windowValues]);

      const latestValue = windowValues['3m'][count - 1];
      const previousValue = count >= 2 ? windowValues['3m'][count - 2] : null;
      const yearAgoValue = count >= 13 ? windowValues['3m'][count - 13] : null;
      const monthChange = Number.isFinite(latestValue) && Number.isFinite(previousValue)
        ? latestValue - previousValue : null;
      const yearChange = Number.isFinite(latestValue) && Number.isFinite(yearAgoValue)
        ? latestValue - yearAgoValue : null;
      const latestMonth = months[lastIndex];
      const previousMonth = months[lastIndex - 1];
      const yearAgoMonth = months[lastIndex - 12];

      let periodLow = Infinity;
      let periodHigh = -Infinity;
      for (const value of windowValues['3m']) {
        if (Number.isFinite(value)) {
          periodLow = Math.min(periodLow, value);
          periodHigh = Math.max(periodHigh, value);
        }
      }

      const rangeLabel = t(range.label);
      const visibleSeries = SERIES.filter(series => !hidden[series.id]);

      function toggleSeries(id) {
        setHidden((current) => {
          const next = { ...current, [id]: !current[id] };
          const shown = SERIES.filter(series => !next[series.id]).length;
          return shown === 0 ? current : next;
        });
      }

      const height = width < 560 ? 252 : 324;
      const padLeft = 46;
      const padRight = 16;
      const padTop = 14;
      const padBottom = 30;
      const innerWidth = Math.max(40, width - padLeft - padRight);
      const innerHeight = Math.max(60, height - padTop - padBottom);
      const span = domain.high - domain.low;
      const xAt = index => padLeft + (count <= 1 ? innerWidth / 2 : (index / (count - 1)) * innerWidth);
      const yAt = value => padTop + ((domain.high - value) / (span === 0 ? 1 : span)) * innerHeight;

      function linePath(values) {
        let path = '';
        let started = false;
        for (let index = 0; index < values.length; index += 1) {
          const value = values[index];
          if (!Number.isFinite(value)) continue;
          path += (started ? ' L ' : 'M ') + xAt(index).toFixed(2) + ' ' + yAt(value).toFixed(2);
          started = true;
        }
        return path;
      }

      const primaryPath = linePath(windowValues['3m']);
      const areaPath = primaryPath === '' ? '' : primaryPath
        + ' L ' + xAt(count - 1).toFixed(2) + ' ' + (padTop + innerHeight).toFixed(2)
        + ' L ' + xAt(0).toFixed(2) + ' ' + (padTop + innerHeight).toFixed(2) + ' Z';

      const yTicks = axisTicks(domain.low, domain.high, width < 560 ? 4 : 5);
      const xTickIndices = sampleIndices(count, width < 430 ? 3 : width < 620 ? 4 : 6);

      const hoveredIndex = hover === null ? null : Math.max(0, Math.min(count - 1, hover));
      const hoverX = hoveredIndex === null ? 0 : xAt(hoveredIndex);
      const tooltipLeft = hoveredIndex === null
        ? 4
        : Math.max(4, Math.min(width - 204, hoverX + 14));

      function pointerIndex(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        if (rect.width === 0) return null;
        const localX = (event.clientX - rect.left) * (width / rect.width);
        const ratio = count <= 1 ? 0 : (localX - padLeft) / innerWidth;
        return Math.max(0, Math.min(count - 1, Math.round(ratio * (count - 1))));
      }

      function handlePointer(event) {
        const index = pointerIndex(event);
        if (index !== null) setHover(index);
      }

      function handleKeyDown(event) {
        if (event.key === 'Escape') { setHover(null); return; }
        const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        setHover((current) => {
          if (event.key === 'Home') return 0;
          if (event.key === 'End') return count - 1;
          const base = current === null ? count - 1 : current;
          return Math.max(0, Math.min(count - 1, base + (event.key === 'ArrowRight' ? 1 : -1)));
        });
      }

      const tableRows = [];
      for (let index = lastIndex; index >= Math.max(0, lastIndex - 11); index -= 1) {
        tableRows.push({
          month: months[index],
          latest: index === lastIndex,
          values: SERIES.map(series => values[series.id][index]),
        });
      }

      return h('div', { className: 'eu-root' },
        h('style', null, CSS),
        h('div', { className: 'eu-scroll' },
          h('div', { className: 'eu-content' },
            h('header', { className: 'eu-head' },
              h('div', null,
                h('h1', { className: 'eu-title' }, t('title')),
                h('p', { className: 'eu-subtitle' }, t('subtitle'))),
              h('div', { className: 'eu-meta' },
                h('div', { className: 'eu-meta-row' },
                  h('span', { className: 'eu-source' },
                    h('span', { className: 'eu-source-dot', 'aria-hidden': true }),
                    t('source')),
                  h('button', {
                    type: 'button',
                    className: 'eu-refresh',
                    onClick: refreshData,
                    disabled: loading,
                    'aria-busy': loading ? 'true' : undefined,
                    title: t('refreshTitle'),
                  },
                  h('svg', { className: 'eu-refresh-icon', viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true },
                    h('path', {
                      d: 'M13.4 8a5.4 5.4 0 1 1-1.58-3.82',
                      stroke: 'currentColor',
                      strokeWidth: 1.5,
                      strokeLinecap: 'round',
                    }),
                    h('path', {
                      d: 'M13.5 2.6v3.9H9.6',
                      stroke: 'currentColor',
                      strokeWidth: 1.5,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    })),
                  h('span', null, loading ? t('refreshing') : t('refresh')))),
                h('span', null, t('through', { month: monthLabel(latestMonth, locale, 'short') })),
                loading
                  ? h('span', { role: 'status' }, t('refreshWait'))
                  : refresh.at !== null
                    ? h('span', { role: 'status' }, t('refreshedAt', { time: timeLabel(refresh.at, locale) }))
                    : null)),
            refresh.failed ? h('div', { className: 'eu-alert', role: 'alert' }, t('refreshFailed')) : null,
            h('div', { className: 'eu-stats' },
              h('div', { className: 'eu-stat' },
                h('div', { className: 'eu-stat-label' }, t('statLatest')),
                h('div', { className: 'eu-stat-value' }, percentText(latestValue)),
                h('div', { className: 'eu-stat-caption' }, monthLabel(latestMonth, locale, 'long'))),
              h('div', { className: 'eu-stat' },
                h('div', { className: 'eu-stat-label' }, t('statMonth')),
                h('div', { className: 'eu-stat-value' }, changeText(monthChange, t)),
                h('div', { className: 'eu-stat-caption' }, t('vsPrevious', { month: monthLabel(previousMonth, locale, 'short') }))),
              h('div', { className: 'eu-stat' },
                h('div', { className: 'eu-stat-label' }, t('statYear')),
                h('div', { className: 'eu-stat-value' }, changeText(yearChange, t)),
                h('div', { className: 'eu-stat-caption' }, t('vsYear', { month: monthLabel(yearAgoMonth, locale, 'short') }))),
              h('div', { className: 'eu-stat' },
                h('div', { className: 'eu-stat-label' }, t('statRange', { range: rangeLabel })),
                h('div', { className: 'eu-stat-value', 'data-compact': true },
                  periodLow.toFixed(2) + ' – ' + periodHigh.toFixed(2)),
                h('div', { className: 'eu-stat-caption' }, t('statRangeCaption')))),
            h('section', { className: 'eu-card', 'aria-labelledby': 'eu-chart-title' },
              h('div', { className: 'eu-card-head' },
                h('div', null,
                  h('div', { className: 'eu-card-title', id: 'eu-chart-title' }, t('chartTitle')),
                  h('div', { className: 'eu-card-hint' }, t('chartHint'))),
                h('div', { className: 'eu-seg', role: 'group', 'aria-label': t('range') },
                  RANGES.map(option => h('button', {
                    key: option.id,
                    type: 'button',
                    'aria-pressed': option.id === rangeId,
                    onClick: () => setRangeId(option.id),
                  }, t(option.label))))),
              h('div', { className: 'eu-legend', role: 'group', 'aria-label': t('legendHint') },
                SERIES.map(series => h('button', {
                  key: series.id,
                  type: 'button',
                  className: 'eu-chip',
                  'aria-pressed': !hidden[series.id],
                  title: t('legendHint'),
                  onClick: () => toggleSeries(series.id),
                },
                h('span', { className: 'eu-dot', style: { background: series.color }, 'aria-hidden': true }),
                h('span', null, series.label),
                h('span', { className: 'eu-chip-value' }, percentText(values[series.id][lastIndex]))))),
              h('div', { className: 'eu-chart-wrap', ref: wrapRef },
                h('svg', {
                  className: 'eu-chart',
                  width,
                  height,
                  viewBox: '0 0 ' + width + ' ' + height,
                  role: 'img',
                  'aria-label': t('chartAria', { range: rangeLabel }),
                  tabIndex: 0,
                  onPointerMove: handlePointer,
                  onPointerDown: handlePointer,
                  onPointerLeave: () => setHover(null),
                  onKeyDown: handleKeyDown,
                  onFocus: () => setHover(current => current === null ? count - 1 : current),
                  onBlur: () => setHover(null),
                },
                h('defs', null,
                  h('linearGradient', { id: 'eu-area-gradient', x1: '0', y1: '0', x2: '0', y2: '1' },
                    h('stop', { offset: '0%', style: { stopColor: 'var(--dsw-alias-brand-primary)', stopOpacity: 0.2 } }),
                    h('stop', { offset: '100%', style: { stopColor: 'var(--dsw-alias-brand-primary)', stopOpacity: 0 } }))),
                yTicks.map(value => h('g', { key: 'y-' + value },
                  h('line', {
                    x1: padLeft,
                    x2: padLeft + innerWidth,
                    y1: yAt(value),
                    y2: yAt(value),
                    className: 'eu-grid',
                  }),
                  h('text', {
                    x: padLeft - 9,
                    y: yAt(value),
                    textAnchor: 'end',
                    dominantBaseline: 'middle',
                    className: 'eu-axis-text',
                  }, axisPercent(value, span)))),
                domain.low < 0 && domain.high > 0
                  ? h('line', {
                    x1: padLeft,
                    x2: padLeft + innerWidth,
                    y1: yAt(0),
                    y2: yAt(0),
                    className: 'eu-zero',
                  })
                  : null,
                xTickIndices.map(index => h('text', {
                  key: 'x-' + index,
                  x: xAt(index),
                  y: height - 8,
                  textAnchor: index === 0 ? 'start' : index === count - 1 ? 'end' : 'middle',
                  className: 'eu-axis-text',
                }, monthLabel(months[firstIndex + index], locale, 'short'))),
                !hidden['3m'] && areaPath !== '' ? h('path', { d: areaPath, fill: 'url(#eu-area-gradient)' }) : null,
                visibleSeries.map(series => h('path', {
                  key: series.id,
                  d: linePath(windowValues[series.id]),
                  fill: 'none',
                  style: { stroke: series.color },
                  strokeWidth: series.id === '3m' ? 2.4 : 1.8,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  opacity: series.id === '3m' ? 1 : 0.92,
                })),
                visibleSeries.map(series => {
                  const value = windowValues[series.id][count - 1];
                  if (!Number.isFinite(value)) return null;
                  return h('circle', {
                    key: 'end-' + series.id,
                    cx: xAt(count - 1),
                    cy: yAt(value),
                    r: series.id === '3m' ? 3.4 : 2.6,
                    style: { fill: 'var(--dsw-alias-bg-layer-1)', stroke: series.color },
                    strokeWidth: 2,
                  });
                }),
                hoveredIndex === null ? null : h('g', null,
                  h('line', {
                    x1: hoverX,
                    x2: hoverX,
                    y1: padTop,
                    y2: padTop + innerHeight,
                    className: 'eu-crosshair',
                  }),
                  visibleSeries.map(series => {
                    const value = windowValues[series.id][hoveredIndex];
                    if (!Number.isFinite(value)) return null;
                    return h('circle', {
                      key: 'hover-' + series.id,
                      cx: hoverX,
                      cy: yAt(value),
                      r: 3.6,
                      style: { fill: series.color, stroke: 'var(--dsw-alias-bg-layer-1)' },
                      strokeWidth: 1.5,
                    });
                  }))),
                hoveredIndex === null ? null : h('div', {
                  className: 'eu-tip',
                  style: { left: tooltipLeft, top: 8 },
                  'aria-hidden': true,
                },
                h('div', { className: 'eu-tip-month' },
                  monthLabel(months[firstIndex + hoveredIndex], locale, 'long')),
                visibleSeries.map(series => {
                  const value = windowValues[series.id][hoveredIndex];
                  return h('div', { key: series.id, className: 'eu-tip-row' },
                    h('span', { className: 'eu-tip-name' },
                      h('span', { className: 'eu-dot', style: { background: series.color } }),
                      series.label),
                    h('span', { className: 'eu-tip-value' },
                      Number.isFinite(value) ? percentText(value) : '—'));
                })))),
            h('section', { className: 'eu-table-card', 'aria-labelledby': 'eu-table-title' },
              h('div', { className: 'eu-table-head' },
                h('div', null,
                  h('div', { className: 'eu-card-title', id: 'eu-table-title' }, t('tableTitle')),
                  h('div', { className: 'eu-card-hint' }, t('tableHint')))),
              h('div', { className: 'eu-table-scroll' },
                h('table', { className: 'eu-table' },
                  h('thead', null,
                    h('tr', null,
                      h('th', { scope: 'col' }, t('month')),
                      SERIES.map(series => h('th', { key: series.id, scope: 'col' }, series.label)))),
                  h('tbody', null,
                    tableRows.map(row => h('tr', { key: row.month, 'data-latest': row.latest },
                      h('td', null,
                        monthLabel(row.month, locale, 'short'),
                        row.latest ? h('span', { className: 'eu-tag' }, t('latest')) : null),
                      row.values.map((value, index) => h('td', { key: SERIES[index].id },
                        Number.isFinite(value) ? percentText(value) : '—')))))))),
            h('footer', { className: 'eu-footer' },
              h('p', null, t('footer', { month: monthLabel(latestMonth, locale, 'long') })),
              h('p', null, t('retrieved', { date: retrievedDate }))))));
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { en: EN, zh: ZH }), 'euribor-trend: dictionaries');
        const t = ctx.locale.bind(NS);

        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: PANEL_ID,
          locale: NS,
          inject: () => ({ getLocale: () => ctx.locale.getSnapshot().active }),
        }, EuriborPanel));

        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: PANEL_ID,
          order: 20,
          locale: NS,
          label: () => t('panel'),
        }, EuriborPanelIcon));
      },
    };
  },
});
