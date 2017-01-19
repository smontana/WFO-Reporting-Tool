var moment = require('moment')
var _ = require('lodash')

var solutions = ['CD', 'CRM', 'CSO', 'DMS', 'F&I', 'RTS']


var build_tsp_reports = {

  build_all_solutions_by_week_start_OFFvsANS: function(data) {
    var cd_stats = _.filter(data, ['Solution', 'CD'])
    var crm_stats = _.filter(data, ['Solution', 'CRM'])
    var cso_stats = _.filter(data, ['Solution', 'CSO'])
    var dms_stats = _.filter(data, ['Solution', 'DMS'])
    var sfi_stats = _.filter(data, ['Solution', 'F&I'])
    var rts_stats = _.filter(data, ['Solution', 'RTS'])

    var get_week_start = _.map(data, function(o) {
      var the_correct_the_date = moment(o.WeekStart).add(1, 'day').format("YYYY-MM-DD")
      return the_correct_the_date
    });

    var uniq_week_start = _.uniq(get_week_start)

    cd_calls_off = _.map(cd_stats, function(stats) {
      return stats.Total_Calls_Offered
    })

    cd_calls_ans = _.find(cd_stats, function(stats) {
      return stats.Total_Calls_Answered
    })


    crm_calls_off = _.find(crm_stats, function(stats) {
      return stats.Total_Calls_Offered
    })

    crm_calls_ans = _.find(crm_stats, function(stats) {
      return stats.Total_Calls_Answered
    })


    cso_calls_off = _.find(cso_stats, function(stats) {
      return stats.Total_Calls_Offered
    })

    cso_calls_ans = _.find(cso_stats, function(stats) {
      return stats.Total_Calls_Answered
    })


    dms_calls_off = _.find(dms_stats, function(stats) {
      return stats.Total_Calls_Offered
    })

    dms_calls_ans = _.find(dms_stats, function(stats) {
      return stats.Total_Calls_Answered
    })


    sfi_calls_off = _.find(sfi_stats, function(stats) {
      return stats.Total_Calls_Offered
    })

    sfi_calls_ans = _.find(sfi_stats, function(stats) {
      return stats.Total_Calls_Answered
    })


    rts_calls_off = _.find(rts_stats, function(stats) {
      return stats.Total_Calls_Offered
    })

    rts_calls_ans = _.find(rts_stats, function(stats) {
      return stats.Total_Calls_Answered
    })

    var cd_col_arr = ['CD', cd_calls_off, cd_calls_ans]
    var crm_col_arr = ['CRM', crm_calls_off, crm_calls_ans]
    var cso_col_arr = ['CSO', cso_calls_off, cso_calls_ans]
    var dms_col_arr = ['DMS', dms_calls_off, dms_calls_ans]
    var sfi_col_arr = ['F&I', sfi_calls_off, sfi_calls_ans]
    var rts_col_arr = ['RTS', rts_calls_off, rts_calls_ans]

    var cols = [
      ['x', 'Calls Offered', 'Calls Answered'],
      ['CD', cd_calls_off, cd_calls_ans],
      ['CRM', crm_calls_off, crm_calls_ans],
      ['CSO', cso_calls_off, cso_calls_ans],
      ['DMS', dms_calls_off, dms_calls_ans],
      ['F&I', sfi_calls_off, sfi_calls_ans],
      ['RTS', rts_calls_off, rts_calls_ans]
    ]

    var chart = c3.generate({
      bindto: "#tsp_all_solutions_by_week_start_bar_chart",

      padding: {
        top: 10,
        // right: 50,
        bottom: 10,
        left: 70
      },

      data: {
        x: 'x',
        columns: cols,
        type: 'bar',
        labels: true
        // ,
        // names: {
        //   cd_col_arr: 'CD',
        //   crm_col_arr: 'CRM',
        //   cso_col_arr: 'CSO',
        //   dms_col_arr: 'DMS',
        //   sfi_col_arr: 'F&I',
        //   rts_col_arr: 'RTS'
        // }
      },

      axis: {
        x: {
          type: 'category',
          label: {
            text: 'Week Start:' + uniq_week_start.toString(),
            position: 'outer-center'
          }
        },

        y: {
          label: {
            text: 'Calls Offered vs Calls Answered',
            position: 'outer-middle'
          }
        }
      },

      bar: {
        width: {
          ratio: 0.5
        }
      },

      legend: {
        position: 'center'
      },

      grid: {
        x: {
          show: true
        },
        y: {
          show: true
        }
      },

      zoom: {
        enabled: true
      }

    });
  }

}

module.exports = build_tsp_reports
